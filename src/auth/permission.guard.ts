import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common'
import { getFeature, getAction } from '@nestjsx/crud'
import { Reflector } from '@nestjs/core'

import { AuthenticatedUser, UserType } from './auth.type'
import { SUPER_ADMIN } from '../roles/roles.const'
import { NO_AUTH, PERMISSIONS, ANY_PERMISSION } from './auth.const'

@Injectable()
export class CrudPermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const handler = context.getHandler()
    const controller = context.getClass()

    const feature = getFeature(controller)
    const action = getAction(handler)

    const request = context.switchToHttp().getRequest()
    const user = request.user as AuthenticatedUser

    const noAuth = this.reflector.get<string[]>(NO_AUTH, context.getHandler())
    if (noAuth) {
      return true
    }

    if (!user) {
      return false
    }

    // Permissions don't apply to guest
    if (user.type === UserType.User) {
      return true
    }

    const isSuperAdmin = Boolean(user.roles?.includes(SUPER_ADMIN))
    if (isSuperAdmin) {
      return true
    }

    let permissions = this.reflector.get<string[]>(PERMISSIONS, handler)

    if (permissions) {
      permissions = permissions.map(p => `${feature}-${p.toLowerCase()}`)
    } else {
      permissions = [`${feature}-${action}`.toLowerCase()]
    }

    if (
      permissions.includes(`${feature}-${ANY_PERMISSION}`) ||
      Boolean(user.permissions?.some(perm => permissions.includes(perm)))
    ) {
      return true
    }

    throw new ForbiddenException()
  }
}
