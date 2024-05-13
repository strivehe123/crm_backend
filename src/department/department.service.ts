import { Injectable } from '@nestjs/common'
import { CreateDepartmentDto } from './dto/create-department.dto'
import { UpdateDepartmentDto } from './dto/update-department.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Department } from './entities/department.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DepartmentService {
  constructor(@InjectRepository(Department) private readonly departmentReposity: Repository<Department>) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentReposity.save(createDepartmentDto)
  }

  findAll() {
    return this.departmentReposity.find()
  }

  findByUserName(name: string) {
    return this.departmentReposity.findOne({
      where: {
        name
      }
    })
  }

  findOne(id: number) {
    return this.departmentReposity.findOne({
      where: {
        id
      }
    })
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const departmentTemp = await this.findOne(id)

    const depoartmentTemp2 = this.departmentReposity.merge(departmentTemp, updateDepartmentDto)
    return this.departmentReposity.save(depoartmentTemp2)
  }

  async remove(id: number) {
    const departmentTemp = await this.findOne(id)
    return this.departmentReposity.remove(departmentTemp)
  }
}
