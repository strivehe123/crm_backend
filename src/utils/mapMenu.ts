export function mapMenusToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermissionString(menu: any[]) {
    for (const item of menu) {
      if (item.type !== 3) {
        recurseGetPermissionString(item.children ?? [])
      } else {
        permissions.push(item.permission)
      }
    }
  }
  recurseGetPermissionString(menuList)
  return permissions
}
