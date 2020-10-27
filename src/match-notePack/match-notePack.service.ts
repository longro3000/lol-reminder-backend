import {
  Injectable, 
  NotFoundException,
  BadRequestException
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { BaseCrudService } from '../base.service'
import { MatchNotePack } from './match-notePack.entity'

@Injectable()
export class MatchNotePackService extends BaseCrudService<MatchNotePack> {
  constructor(
    @InjectRepository(MatchNotePack) matchNotePackRepo: Repository<MatchNotePack>
  ) {
    super(matchNotePackRepo)
  }
}