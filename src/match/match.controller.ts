import { CrudController } from '@nestjsx/crud'
import { NotFoundException, Param, Get } from '@nestjs/common'


@AppCrudController(AppFeature.TestAssignments, {
  model: {
    type: TestAssignment,
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
  implements CrudController<TestAssignment> {
  constructor(public service: TestAssignmentsService) {}

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