import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local'
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common'

import { UserService } from '../user/user.service'
import AuthService from './auth.service'
import { AUTH_TOKEN } from './auth.const'

@Injectable()
export class AuthStrategy extends PassportStrategy(
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

  async validate(username: string, password: string)
}