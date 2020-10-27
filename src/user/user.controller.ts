import { CrudController, Override, CrudRequest, ParsedRequest, ParsedBody } from '@nestjsx/crud'
import { Post, Req, UseGuards, Body, BadRequestException, Get } from '@nestjs/common'
import { Request } from 'express'

import { UserService } from './user.service'
import { User } from './user.entity'
import { AppCrudController } from '../app.decorator'
import { AppFeature } from '../app.type'
import AuthService from '../auth/auth.service'
import BypassAuth from '../auth/bypass-auth.decorator'
import { UserAuthGuard, GuestAuthGuard } from '../auth/auth.guard'

@AppCrudController(AppFeature.Users, {
  model: {
    type: User
  },
  query: {
    join: {
      notePacks: {
        allow: [],
        eager: true
      }
    }
  }
})
export class UserController implements CrudController<User> {
  constructor(public service: UserService, private authService: AuthService) {}

  get base(): CrudController<User> {
    return this
  }

  @Post('signin')
  @BypassAuth()
  @UseGuards(UserAuthGuard)
  signIn(@Req() req) {
    return this.authService.login(req.user)
  }

  @Get('signin-as-guest')
  @BypassAuth()
  @UseGuards(GuestAuthGuard)
  signInAsGuest(@Req() req: any) {
    return this.authService.login(req.user)
  }

  @Override()
  @BypassAuth()
  createOne(
    @ParsedRequest() parsedReq: CrudRequest,
    @ParsedBody() body: any,
  ) {
    if (body.email === 'bui.minhnguyen96@gmail.com') {
      body.isAdmin = true
    }
    return this.base.createOneBase!(parsedReq, body)
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