import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AUTH_TOKEN } from './auth.const'

@Injectable()

export class AppAuthGuard extends AuthGuard (AUTH_TOKEN) {}