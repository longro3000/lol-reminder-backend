import {
  Injectable, 
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { BaseCrudService } from '../base.service'
import { UserNotePack } from './user-notePack.entity'

@Injectable()
export class UserNotePackService extends BaseCrudService<UserNotePack> {
  constructor(
    @InjectRepository(UserNotePack) userNotePackRepo: Repository<UserNotePack>
  ) {
    super(userNotePackRepo)
  }
}