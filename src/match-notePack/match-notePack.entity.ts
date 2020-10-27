import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from 'typeorm'

import { BaseEntity } from '../base.entity'
import { Match } from '../match/match.entity'
import { NotePack } from '../note-pack/note-pack.entity'

@Entity('match_note_pack')
export class MatchNotePack extends BaseEntity {
  @PrimaryColumn({
    name: 'match_id'
  })
  matchId: string

  @PrimaryColumn({
    name: 'note_pack_id'
  })
  notePackId: string

  @ManyToOne(() => Match, 
    match => match.notePacks,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'match_id '})
  match: Match

  @ManyToOne(() => NotePack, 
    notePack => notePack.matches,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'note_pack_id '})
  notePack: NotePack
}