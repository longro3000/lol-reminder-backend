
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

import { NotePack } from './note-pack.entity'
import { BaseCrudService } from '../base.service';

@Injectable()
export class NotePackService extends BaseCrudService<NotePack> {
  constructor(
    @InjectRepository(NotePack) notePackRepo: Repository<NotePack>
  ) {
    super(notePackRepo)
  }
}