import { CrudController } from '@nestjsx/crud'
import { NotFoundException, Param, Get } from '@nestjs/common'

import { AppFeature } from '../app.type'
import { NotePack } from './note-pack.entity'
import { NotePackService } from './note-pack.service'
import { AppCrudController } from '../app.decorator'


@AppCrudController(AppFeature.NotePacks, {
  model: {
    type: NotePack,
  },
  query: {
  },
})
export class NotePackController
  implements CrudController<NotePack> {
  constructor(public service: NotePackService) {}
}