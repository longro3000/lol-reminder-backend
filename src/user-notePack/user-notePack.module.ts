import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserNotePackService } from './user-notePack.service'
import { UserNotePack } from './user-notePack.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserNotePack])],
  providers: [UserNotePackService],
})
export class UserNotePackModule {}