import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NotePackModule } from '../note-pack/note-pack.module'
import { MatchService } from './match.service'
import { Match } from './match.entity'
import { MatchController } from './match.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    Match
    forwardRef(() => NotePackModule)
  ],
  providers: [MatchService],
  controllers: [MatchController],
  exports: [MatchService]
})
export class MatchModule {}