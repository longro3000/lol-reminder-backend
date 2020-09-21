import { AppAuthGuard } from './auth.guard';

import { Module, Global } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserJwtAuthStrategy } from './jwt.strategy'
import AuthService from './auth.service'
import {
  UserJwtAuthGuard,
  JwtAuthGuard,
} from './jwt.guard'
import { AuthStrategy } from './auth.strategy'
import { UserModule } from '../user/user.module'
import { AppConfigModule } from '../config/config.module'
import { CrudPermissionGuard } from './permission.guard'

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
    AuthStrategy,
    UserJwtAuthStrategy,
    UserJwtAuthGuard,
    JwtAuthGuard,
    CrudPermissionGuard,
  ],
  exports: [
    UserJwtAuthGuard,
    AppAuthGuard,
    JwtAuthGuard,
    AuthService,
    CrudPermissionGuard,
  ],
})
export class AuthModule {}
