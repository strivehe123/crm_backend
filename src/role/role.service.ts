import { Injectable } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Role } from './entities/role.entity'
import { Repository } from 'typeorm'

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private readonly roleReposity: Repository<Role>) {}

  create(createRoleDto: CreateRoleDto) {
    const roleRepo = this.roleReposity.create(createRoleDto)
    return this.roleReposity.save(roleRepo)
  }

  findAll() {
    return this.roleReposity.find()
  }

  findOne(id: number) {
    return this.roleReposity.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const roleTemp1 = await this.findOne(id)
    const roleTemp2 = this.roleReposity.merge(roleTemp1, updateRoleDto)
    return this.roleReposity.save(roleTemp2)
  }

  async remove(id: number) {
    const roleTemp1 = await this.findOne(id)
    return this.roleReposity.remove(roleTemp1)
  }
}
