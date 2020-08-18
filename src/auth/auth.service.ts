import { Injectable } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

import {
  AuthenticatedUser,
  JwtTokenPayload,
  UserType,
  LoginResponse
} from './auth.type'

@Injectable()
export default class AuthService {
  constructor(private configService: AppConfigService) {}

  
}