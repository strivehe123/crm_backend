import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'
import { AuthGuard } from 'src/guards/auth.guard'
import { CaslGuard } from 'src/guards/casl.guard'
import { Can } from 'src/decorators/casl.decorator'
import { Role } from './entities/role.entity'
import { Action } from 'src/enum/action.enum'
import { ApiTags } from '@nestjs/swagger'

@Controller('role')
@UseGuards(AuthGuard, CaslGuard)
@ApiTags('角色管理')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto)
  }

  @Get()
  @Can(Action.Read, Role)
  findAll() {
    return this.roleService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id)
  }
}
