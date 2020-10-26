import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable, HttpService } from '@nestjs/common'

import { Match } from './match.entity'
import { LoLMatch } from './match.type'
import { BaseCrudService } from '../base.service';
import { Observable } from 'rxjs';
import { baseUrls } from 'src/baseUrls'

@Injectable()
export class MatchService extends BaseCrudService<Match> {
  constructor(
    @InjectRepository(Match) matchRepo: Repository<Match>,
    private httpService: HttpService
  ) {
    super(matchRepo)
  }

  async findByAccountId(region: string, accountId: string): Promise<LoLMatch> {
    const response = await this.httpService.get(`${baseUrls[region]}/match/v4/matchlists/by-account/${accountId}`).toPromise()
    return response.data
  }
}