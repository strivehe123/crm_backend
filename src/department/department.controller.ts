import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { DepartmentService } from './department.service'
import { CreateDepartmentDto } from './dto/create-department.dto'
import { UpdateDepartmentDto } from './dto/update-department.dto'
import { AuthGuard } from 'src/guards/auth.guard'
import { ApiTags } from '@nestjs/swagger'

@Controller('department')
@UseGuards(AuthGuard)
@ApiTags('部门管理')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const res = await this.departmentService.findByUserName(createDepartmentDto.name)
    if (res) throw new HttpException('部门名称不能重复.', HttpStatus.BAD_REQUEST)
    return this.departmentService.create(createDepartmentDto)
  }

  @Get()
  findAll() {
    return this.departmentService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentService.update(+id, updateDepartmentDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id)
  }
}
