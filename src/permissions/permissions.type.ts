import { AppFeature } from '../app.type'

export type Permission = {
  name: string
  description: string
}

export type PermissionGroup = {
  group: AppFeature
  description: string
  permissions: Permission[]
}
