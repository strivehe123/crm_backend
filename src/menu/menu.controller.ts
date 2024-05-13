import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common'
import { MenuService } from './menu.service'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { AuthGuard } from 'src/guards/auth.guard'
import { ApiTags } from '@nestjs/swagger'

@Controller('menu')
@UseGuards(AuthGuard)
@ApiTags('菜单管理')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto)
  }
  @Post('role')
  findByRoleId(@Body('roleId', ParseIntPipe) roleId: string) {
    return this.menuService.findByRoleId(+roleId)
  }
  @Get()
  findAll() {
    return this.menuService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id)
  }
}
