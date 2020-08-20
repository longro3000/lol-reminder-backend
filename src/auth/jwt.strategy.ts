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
import { JWT_AUTH_USER, JWT_AUTH_GUEST, JWT_AUTH_ADMIN} from './auth.const'

@Injectable()
export class UserJwtAuthStrategy extends PassportStrategy(
  Strategy,
  JWT_AUTH_USER
) {
  
}