import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserNotePackService } from './user-notepack.service.ts'
import { UserNotePack } from './user-notepack.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserNotePack])],
  providers: [UserNotePackService],
})
export class UserNotePackModule {}