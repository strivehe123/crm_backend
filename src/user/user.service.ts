import { ForbiddenException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { Role } from 'src/role/entities/role.entity'
import * as argon2 from 'argon2'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isExistUser = await this.findByUsername(createUserDto.username)
    if (isExistUser) throw new ForbiddenException('用户名已存在。')
    const userTemp = this.userRepository.create(createUserDto)
    const role = await this.roleRepository.findOne({ where: { id: 1 } })
    userTemp.roles = [role]
    userTemp.password = await argon2.hash(userTemp.password)
    return this.userRepository.save(userTemp)
  }

  async findAll(username: string, role: number, offset: number = 0, limit: number = 10) {
    // return this.userRepository.find({
    //   relations: {
    //     department: true,
    //     roles: true
    //   }
    // })
    const sql = `SELECT u.id,u.username,u.created_at createAt,
    JSON_OBJECT('name',d.name,'leader',d.leader) department,
		JSON_ARRAYAGG(JSON_OBJECT('name',r.name,'id',r.id)) roles from user  u 
      LEFT JOIN user_role ur on u.id=ur.userId
      LEFT JOIN role r on  ur.roleId=r.id 
      LEFT JOIN department d ON d.id = u.departmentId
      where  (r.id=? or ? is null)    and (u.username like  concat('%',?,'%') or ? is null) group by u.id limit ${offset},${limit} `
    const res = await this.userRepository.query(sql, [role, role, username, username])

    return res
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }
  findByUsername(name: string) {
    return this.userRepository.findOne({
      where: {
        username: name
      },
      relations: {
        roles: true
      }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
