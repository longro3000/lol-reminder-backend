import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

import { Match } from './match.entity'
import { BaseCrudService } from '../base.service';

@Injectable()
export class MatchService extends BaseCrudService<Match> {
  constructor(
    @InjectRepository(Match) matchRepo: Repository<Match>
  ) {
    super(matchRepo)
  }
}