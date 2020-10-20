import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { USER_TOKEN, GUEST_TOKEN } from './auth.const'

@Injectable()

export class UserAuthGuard extends AuthGuard (USER_TOKEN) {}
export class GuestAuthGuard extends AuthGuard (GUEST_TOKEN) {}