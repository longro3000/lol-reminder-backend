import { CrudActions } from '@nestjsx/crud'

import { AppFeature } from '../app.type'
import { PermissionGroup, Permission } from './permissions.type'

export const makePermission = (
  action: CrudActions,
  feature: AppFeature,
): Permission => {
  return {
    name: `${feature}-${action.toLowerCase()}`,
    description: action.replace('-', ' '),
  }
}

export const makePermissionGroup = (
  feature: AppFeature,
  customPermissions?: Permission[],
  description?: string,
): PermissionGroup => {
  return {
    group: feature,
    description: description ?? `Manage ${feature} feature`,
    permissions: [
      makePermission(CrudActions.ReadAll, feature),
      makePermission(CrudActions.ReadOne, feature),
      makePermission(CrudActions.CreateOne, feature),
      makePermission(CrudActions.CreateMany, feature),
      makePermission(CrudActions.UpdateOne, feature),
      makePermission(CrudActions.ReplaceOne, feature),
      makePermission(CrudActions.DeleteOne, feature),
    ].concat(customPermissions ?? []),
  }
}

// Define here any custom permissions
const customPermissions: Permission[] = []

export const PERMISSION_GROUPS: PermissionGroup[] = [
  makePermissionGroup(AppFeature.Roles),
  makePermissionGroup(AppFeature.Users),
  makePermissionGroup(AppFeature.Students),
  makePermissionGroup(AppFeature.Questions),
  makePermissionGroup(AppFeature.Courses),
  makePermissionGroup(AppFeature.Tests),
  makePermissionGroup(AppFeature.Templates),
  makePermissionGroup(AppFeature.Topics),
  makePermissionGroup(AppFeature.Applications),
  {
    group: AppFeature.Misc,
    description: 'Misc',
    permissions: customPermissions,
  },
]
