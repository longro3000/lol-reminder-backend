import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NotePackService } from './note-pack.service'
import { NotePack } from './note-pack.entity'

@Module({
  imports: [TypeOrmModule.forFeature([NotePack])],
  providers: [NotePackService],
})
export class NotePackModule {}