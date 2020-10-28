import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { MatchNotePackService } from './match-notePack.service'
import { MatchNotePack } from './match-notePack.entity'

@Module({
  imports: [TypeOrmModule.forFeature([MatchNotePack])],
  providers: [MatchNotePackService],
})
export class MatchNotePackModule {}