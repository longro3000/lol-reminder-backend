import { CrudController } from '@nestjsx/crud'
import { NotFoundException, Param, Get } from '@nestjs/common'

import { AppFeature } from '../app.type'
import { Match } from './match.entity'
import { MatchService } from './match.service'
import { AppCrudController } from '../app.decorator'


@AppCrudController(AppFeature.Matches, {
  model: {
    type: Match,
  },
  query: {
    join: {
      student: {
        eager: true,
      },
    },
  },
})
export class MatchController
  implements CrudController<Match> {
  constructor(public service: MatchService) {}
}