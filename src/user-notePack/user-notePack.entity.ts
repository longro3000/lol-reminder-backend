import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm'

import { BaseEntity } from '../base.entity'
import { User } from '../user/user.entity'
import { NotePack } from '../note-pack/note-pack.entity'

@Entity('user_note_pack')
export class UserNotePack extends BaseEntity {
  @PrimaryColumn({
    name: 'user_id'
  })
  userId: string

  @PrimaryColumn({
    name: 'note_pack_id'
  })
  notePackId: string

  @ManyToOne(() => User, 
    user => user.notePacks,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'user_id '})
  user: User

  @ManyToOne(() => NotePack, 
    notePack => notePack.users,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'note_pack_id '})
  notePack: NotePack
}