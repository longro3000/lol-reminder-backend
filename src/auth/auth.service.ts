import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

import { AppConfigService } from '../config/config.service'
import {
  AuthenticatedUser,
  JwtTokenPayload,
  UserType,
  LoginResponse
} from './auth.type'

@Injectable()
export default class AuthService {
  constructor(private configService: AppConfigService) {}

  async generateToken(payload: any, userType: UserType = UserType.Guest) {
    return jwt.sign(
      {
        ...payload
      },
      this.configService.getJwtSecrect(userType),
      {
        expiresIn: this.configService.get<string>(
          'JWT_EXPIRES_IN_' + userType.toUpperCase(),
          '4h'
        )
      }
    )
  }
  
  async login(user: AuthenticatedUser): Promise<LoginResponse> {
    const payload: JwtTokenPayload = {
      email: user.email,
      id: user.id,
      type: user.type,
      username: user.username
    }

    const response: any = {
      accessToken: await this.generateToken(payload, user.type),
      ...payload,
      summoner: user.summoners,
    }

    if (user.avatar) {
      response.avatar = user.avatar
    }

    return response
  }
}