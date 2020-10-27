import { Module, Global } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserJwtAuthStrategy, GuestJwtAuthStrategy } from './jwt.strategy'
import AuthService from './auth.service'
import {
  UserJwtAuthGuard,
  JwtAuthGuard,
  GuestJwtAuthGuard,
} from './jwt.guard'
import { GuestAuthStrategy, UserAuthStrategy } from './auth.strategy'
import { UserModule } from '../user/user.module'
import { AppConfigModule } from '../config/config.module'
import { UserAuthGuard, GuestAuthGuard } from './auth.guard'

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    AppConfigModule,
  ],
  providers: [
    AuthService,
    UserAuthGuard,
    GuestAuthGuard,
    GuestAuthStrategy,
    UserAuthStrategy,
    UserJwtAuthStrategy,
    GuestJwtAuthStrategy,
    UserJwtAuthGuard,
    GuestJwtAuthGuard,
    JwtAuthGuard
  ],
  exports: [
    UserJwtAuthGuard,
    GuestJwtAuthGuard,
    UserAuthGuard,
    GuestAuthGuard,
    JwtAuthGuard,
    AuthService
  ],
})
export class AuthModule {}
