import { CrudController } from '@nestjsx/crud'
import { Post, Req, UseGuards } from '@nestjs/common'
import { Request } from 'express'

import { UserService } from './user.service'
import { User } from './user.entity'
import { AppCrudController } from '../app.decorator'
import { AppFeature } from '../app.type'
import AuthService from '../auth/auth.service'
import BypassAuth from '../auth/bypass-auth.decorator'

@AppCrudController(AppFeature.Users, {
  model: {
    type: User
  },
  query: {

  }
})
export class UserController implements CrudController<User> {
  constructor(public service: UserService, private authService: AuthService) {}

  @Post('login')
  @BypassAuth()
  @UseGuards()
}