import { Module, Global } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import {
  UserGoogleIdAuthStrategy,
  StudentGoogleIdAuthStrategy,
} from './google-id.strategy'
import { UserJwtAuthStrategy, StudentJwtAuthStrategy } from './jwt.strategy'
import AuthService from './auth.service'
import {
  StudentJwtAuthGuard,
  UserJwtAuthGuard,
  JwtAuthGuard,
} from './jwt.guard'
import {
  StudentGoogleIdAuthGuard,
  UserGoogleIdAuthGuard,
} from './google-id.guard'
import { UsersModule } from '../users/users.module'
import { StudentsModule } from '../students/students.module'
import { AppConfigModule } from '../config/config.module'
import { CrudPermissionGuard } from './permission.guard'

@Global()
@Module({
  imports: [
    StudentsModule,
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    AppConfigModule,
  ],
  providers: [
    AuthService,
    UserGoogleIdAuthStrategy,
    StudentGoogleIdAuthStrategy,
    UserJwtAuthStrategy,
    StudentJwtAuthStrategy,
    StudentJwtAuthGuard,
    UserJwtAuthGuard,
    StudentGoogleIdAuthGuard,
    UserGoogleIdAuthGuard,
    JwtAuthGuard,
    CrudPermissionGuard,
  ],
  exports: [
    StudentJwtAuthGuard,
    StudentGoogleIdAuthGuard,
    UserJwtAuthGuard,
    UserGoogleIdAuthGuard,
    JwtAuthGuard,
    AuthService,
    CrudPermissionGuard,
  ],
})
export class AuthModule {}
