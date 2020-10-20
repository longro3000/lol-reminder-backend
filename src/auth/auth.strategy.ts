import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'

import { UserService } from '../user/user.service'
import AuthService from './auth.service'
import { AUTH_TOKEN } from './auth.const'

@Injectable()
export class UserAuthStrategy extends PassportStrategy(
  Strategy,
  AUTH_TOKEN
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

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}

@Injectable()
export class GuestAuthStrategy extends PassportStrategy(
  Strategy,
  AUTH_TOKEN
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

    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}