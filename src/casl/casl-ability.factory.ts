import { createMongoAbility, AbilityBuilder, ExtractSubjectType, Subject } from '@casl/ability'
import { Injectable } from '@nestjs/common'
import { MenuService } from 'src/menu/menu.service'
// import { Role } from 'src/role/entities/role.entity'
import { UserService } from 'src/user/user.service'
import { mapMenusToPermissions } from 'src/utils/mapMenu'
import { getEntities } from 'src/utils/common'
@Injectable()
export class CaslAbilityFactory {
  constructor(
    private readonly userService: UserService,
    private readonly menuService: MenuService
  ) {}

  async createForUser(username: string) {
    // console.log('🚀 ~ CaslAbilityFactory ~ createForUser ~ user:', username)
    const userobj = await this.userService.findByUsername(username)
    const roleId = userobj.roles.sort((a, b) => b.id - a.id).map((item) => item.id)[0]
    const menus = await this.menuService.findByRoleId(roleId)
    const permissions = mapMenusToPermissions(menus)
    const { can, build } = new AbilityBuilder(createMongoAbility)

    for (let i = 0; i < permissions.length; i++) {
      const permission = permissions[i].split(':')
      const path = permission[1]
      const deal = permission[2] == 'query' ? 'read' : permission[2]
      const Entity = getEntities(path)
      if (Entity) can(deal, getEntities(path))
    }

    const ability = build({
      detectSubjectType: (object) => object.constructor as ExtractSubjectType<Subject>
    })
    return ability
  }
}
