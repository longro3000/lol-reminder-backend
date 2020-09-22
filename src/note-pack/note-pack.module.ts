import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NotePackService } from './note-pack.service'
import { NotePack } from './note-pack.entity'
import { UserModule } from './../user/user.module'
import { MatchModule } from './../match/match.module'
import { NotePackController } from './note-pack.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([NotePack]),
    forwardRef(() => MatchModule),
    forwardRef(() => UserModule)
  ],
  providers: [NotePackService],
  controllers: [NotePackController],
  exports: [NotePackService]
})
export class NotePackModule {}