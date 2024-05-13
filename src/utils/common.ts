import { Department } from 'src/department/entities/department.entity'
import { Menu } from 'src/menu/entities/menu.entity'
import { Role } from 'src/role/entities/role.entity'
import { User } from 'src/user/entities/user.entity'

export const getEntities = (path: string) => {
  const map = {
    department: Department,
    menu: Menu,
    role: Role,
    user: User
  }
  for (let i = 0; i < Object.keys(map).length; i++) {
    const key = Object.keys(map)[i]
    if (path.startsWith(key)) {
      return map[key]
    }
  }
}
