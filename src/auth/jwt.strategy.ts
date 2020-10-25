import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { AppConfigService } from '../config/config.service'
import { 
  AuthenticatedUser,
  JwtTokenPayload,
  UserType
} from './auth.type'
import { UserService } from '../user/user.service'
import { JWT_AUTH_USER, JWT_AUTH_GUEST } from './auth.const'

@Injectable()
export class UserJwtAuthStrategy extends PassportStrategy(
  Strategy,
  JWT_AUTH_USER
) {
  constructor(
    private userService: UserService,
    configService: AppConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecrect(UserType.User)
    })
  }

  async validate(
    payload: JwtTokenPayload
  ): Promise<AuthenticatedUser | undefined> {
    const user = await this.userService.findOne({
      where: {
        username: payload.username,
        isBanned: false
      }
    })

    if (!user) return undefined

    return {
      username: user.username,
      id: user.id,
      type: UserType.User,
      email: user.email, 
      summoners: user.summoners,
      isAdmin: user.isAdmin,
    }
  }
}

@Injectable()
export class GuestJwtAuthStrategy extends PassportStrategy(
  Strategy,
  JWT_AUTH_GUEST
) {
  constructor(
    configService: AppConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getJwtSecrect(UserType.Guest)
    })
  }

  async validate(
    payload: JwtTokenPayload
  ): Promise<AuthenticatedUser | undefined> {
    if (payload.username === 'Guest' && payload.type === UserType.Guest)
    return {
      id: '0',
      type: UserType.Guest,
      email: "",
      username: "Guest",
      isAdmin: false
    }
    else return undefined
  }
}