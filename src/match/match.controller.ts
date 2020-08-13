import { CrudController } from '@nestjsx/crud'
import { NotFoundException, Param, Get } from '@nestjs/common'

import { AppFeature } from '../app.type'
import { Match } from './match.entity'
import { MatchService } from './match.service'


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

  @Get('/completed')
  async getCompleted() {
    const completedAssignments = await this.service.find({
      where: {
        finishAt: Not(IsNull()),
      },
      relations: ['student'],
    })

    if (!completedAssignments) {
      throw new NotFoundException('No completed test assignments found')
    }
    return completedAssignments
  }

  @Get(':id/submissions')
  async getSubmissions(@Param('id') testAssignmentId: string) {
    const assignment = await this.service.findOne({
      id: testAssignmentId,
    })

    if (!assignment) {
      throw new NotFoundException('Test assignment not found')
    }

    return await this.service.getSubmissions(
      assignment.studentId,
      assignment.testId,
    )
  }
}