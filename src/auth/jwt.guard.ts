import {
  Injectable,
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'

import { JWT_AUTH_USER, NO_AUTH, JWT_AUTH_GUEST } from './auth.const'
import { UserType } from '../auth/auth.type'

@Injectable()
export class UserJwtAuthGuard extends AuthGuard(JWT_AUTH_USER) {
  constructor(private reflector: Reflector) {
    super()
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const noAuth = this.reflector.get<string[]>(NO_AUTH, context.getHandler())
    if (noAuth) {
      return user
    }
    return super.handleRequest(err, user, info, context)
  }
}

@Injectable()
export class GuestJwtAuthGuard extends AuthGuard(JWT_AUTH_GUEST) {
  constructor(private reflector: Reflector) {
    super()
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const noAuth = this.reflector.get<string[]>(NO_AUTH, context.getHandler())
    if (noAuth) {
      return user
    }
    return super.handleRequest(err, user, info, context)
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private userGuard: UserJwtAuthGuard,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let userAuth

    // Handler context takes priority
    let userTypes =
      this.reflector.get<any>('USER_TYPES', context.getHandler()) ||
      this.reflector.get<any>('USER_TYPES', context.getClass())

    if (!(typeof userTypes === 'object')) {
      userTypes = [userTypes]
    }

    try {
      userAuth = await this.userGuard.canActivate(context)
    } catch (_e) {}

    if (userTypes.includes(UserType.User) && Boolean(userAuth)) {
      return true
    }

    throw new UnauthorizedException()
  }
}