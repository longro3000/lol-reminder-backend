import { CrudController, Override } from '@nestjsx/crud'
import { NotFoundException, Param, Get, Req, Body } from '@nestjs/common'
import { Request } from 'express'
import { AppFeature } from '../app.type'
import { Match } from './match.entity'
import { MatchService } from './match.service'
import { AppCrudController } from '../app.decorator'


@AppCrudController(AppFeature.Matches, {
  model: {
    type: Match,
  },
  query: {
  },
})
export class MatchController
  implements CrudController<Match> {
  constructor(
    public service: MatchService
  ) {}

  get base(): CrudController<Match> {
    return this
  }  

  @Get('/regions/:region/summoners/:summonerId')
  async getMatchHistoryBySummonerId (
    @Req() req: Request,
    @Param('summonerId') summonerId: string,
    @Param('region') region: string
  ) {
    this.service.findMatchListByAccountId(region, summonerId)
  }
}