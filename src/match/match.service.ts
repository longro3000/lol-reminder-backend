import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable, HttpService } from '@nestjs/common'

import { Match } from './match.entity'
import { LoLMatch, MatchList } from './match.type'
import { BaseCrudService } from '../base.service';
import { baseUrls } from 'src/baseUrls'

@Injectable()
export class MatchService extends BaseCrudService<Match> {
  constructor(
    @InjectRepository(Match) repo: Repository<Match>,
    private httpService: HttpService
  ) {
    super(repo)
  }

  async fetchMatchListByAccountId(region: string, accountId: string): Promise<MatchList> {
    const response = await this.httpService.get(`${baseUrls[region]}/match/v4/matchlists/by-account/${accountId}`).toPromise()
    return response.data
  }

  async findMatchListByAccountId(region: string, accountId: string, ): Promise<MatchList> {
    const fetchedMatchList = await this.fetchMatchListByAccountId(region, accountId)
    const matches = await Promise.all(fetchedMatchList.matches.map(async (match) => {
      const notePacks = await this.repo.findOne({
        where: { matchId: match.gameId, server: region, summonerId: accountId }
      }).then(match => match!.notePacks)
      return {
        ...match,
        notePacks: notePacks
      }
    }))
    return {
      ...fetchedMatchList,
      matches: matches
    }
  }
}