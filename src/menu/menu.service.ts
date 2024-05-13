import { Injectable } from '@nestjs/common'
import { CreateMenuDto } from './dto/create-menu.dto'
import { UpdateMenuDto } from './dto/update-menu.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Menu } from './entities/menu.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private readonly menuRepository: Repository<Menu>) {}

  create(createMenuDto: CreateMenuDto) {
    return 'This action adds a new menu'
  }

  findAll() {
    return this.menuRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`
  }
  async findByRoleId(roleId: number) {
    const sql = `select menu.* from menu INNER JOIN menu_role ml ON ml.menuId=menu.id  INNER JOIN  role on ml.roleId=role.id where role.id=? order by menu.type`
    const menuDict = new Map()
    const res = await this.menuRepository.query(sql, [roleId])
    res.forEach((item) => {
      if (item.type === 2) {
        item['children'] = []
        menuDict.set(item.id, item)
      } else {
        const temp = menuDict.get(item.parentId)
        if (temp) {
          temp['children'].push(item)
        }
      }
    })
    res.forEach((item) => {
      if (item.type === 1) {
        item['children'] = []
        menuDict.set(item.id, item)
      } else if (item.type === 2) {
        const temp = menuDict.get(item.parentId)
        if (temp) temp['children'].push(item)
      }
    })

    return [...menuDict.values()]
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`
  }

  remove(id: number) {
    return `This action removes a #${id} menu`
  }
}
