import { CrudController } from '@nestjsx/crud'
import { Post, Req, UseGuards, Body, BadRequestException } from '@nestjs/common'
import { Request } from 'express'

import { UserService } from './user.service'
import { User } from './user.entity'
import { AppCrudController } from '../app.decorator'
import { AppFeature } from '../app.type'
import AuthService from '../auth/auth.service'
import BypassAuth from '../auth/bypass-auth.decorator'
import { AppAuthGuard } from '../auth/auth.guard'

@AppCrudController(AppFeature.Users, {
  model: {
    type: User
  },
  query: {

  }
})
export class UserController implements CrudController<User> {
  constructor(public service: UserService, private authService: AuthService) {}

  get base(): CrudController<User> {
    return this
  }

  @Post('login')
  @BypassAuth()
  @UseGuards(AppAuthGuard)
  login(@Req() req: Request) {
    return this.authService.login(req.user)
  }

  @Post('check-email')
  @BypassAuth()
  async checkMail(@Body('email') email: string) {
    const existedEmail = await this.service.findOne({
      where: {
        email: email
      }
    })

    if (existedEmail) throw new BadRequestException('Given email is not available')
    return 'Given email is available'
  }

  @Post('check-username')
  @BypassAuth()
  async checkUsername(@Body('username') username: string) {
    const existedUsername = await this.service.findOne({
      where: {
        username: username
      }
    })

    if (existedUsername) throw new BadRequestException('Given username is not available')
    return 'Given email is available'
  }
}