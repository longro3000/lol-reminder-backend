import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'

import { UserService } from '../user/user.service'
import AuthService from './auth.service'
import { USER_TOKEN, GUEST_TOKEN } from './auth.const'
import { UserType } from './auth.type';

@Injectable()
export class UserAuthStrategy extends PassportStrategy(
  Strategy,
  USER_TOKEN
) {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    })
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.validateUser(username, password)

    if (!user || user.isBanned === true) {
      throw new UnauthorizedException()
    }
    return {
      id: user.id,
      type: UserType.User,
      email: user.email, 
      avatar: user.avatar,
      summoners: user.summoners,
      username: user.username,
      isAdmin: user.isAdmin,
      roles: user.roles,
      permissions: Array.from(
        new Set(
          user.roles.reduce<string[]>(
            (acc, curr) => acc.concat(curr.permissions),
            [],
          ),
        ),
      )
    }
  }
}

@Injectable()
export class GuestAuthStrategy extends PassportStrategy(
  Strategy,
  GUEST_TOKEN
) {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    super()
  }

  async validate(): Promise<any> {
    const guest = {}
    return user
  }
}