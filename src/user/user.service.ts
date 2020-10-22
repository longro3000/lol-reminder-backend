import {
  Injectable, 
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { BaseCrudService } from '../base.service'
import { User } from './user.entity'

@Injectable()
export class UserService extends BaseCrudService<User> {
  constructor(
    @InjectRepository(User) userRepo: Repository<User>
  ) {
    super(userRepo)
  }

  async validateUser(username: string, password: string) {
    const user = await this.repository.findOne({
      where: {
      username: username,
      isBanned: false
    }});
    if (user && user.comparePassword(password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}