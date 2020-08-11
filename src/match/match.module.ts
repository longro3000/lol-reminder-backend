import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MatchService } from './match.service'
import { Match } from './match.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchService],
})
export class MatchModule {}