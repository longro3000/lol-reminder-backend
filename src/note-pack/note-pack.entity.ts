import { 
  Entity, 
  Column,
  JoinColumn,
  OneToOne,
  OneToMany
} from 'typeorm'
import { CrudValidationGroups } from '@nestjsx/crud'
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  MaxLength,
  IsInt,
  IsPositive,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'

import { BaseEntity } from '../base.entity'
import { User } from '../user/user.entity'
import { UserNotePack } from '../user-notePack/user-notePack.entity';
import { NoteDTO } from '../note/note.dto'
import { MatchNotePack } from 'src/match-notePack/match-notePack.entity'

export enum Lanes {
  TOP = "top",
  JUNGLE = "jungle",
  MID = "mid",
  BOT = "bot",
  SUPPORT = "support"
}

const { UPDATE } = CrudValidationGroups

@Entity('note-pack')
export class NotePack extends BaseEntity {
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @MaxLength(40, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @Column({ name: 'name', type: 'varchar', length: 40})
  name: string

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @Column({ name: 'description', type: 'varchar', length: 100})
  description: string

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @MaxLength(10, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @Column({ name: 'patch', type: 'varchar', length: 10})
  patch: string

  @IsNotEmpty({ always: true })
  @IsBoolean({ always: true })
  @Column({ name: 'is_public', default: true})
  isPublic: boolean

  @IsNotEmpty({ always: true})
  @IsOptional({ groups: [UPDATE] })
  @IsArray({ always: true })
  @Column({ name: 'champions', type: 'varchar', array: true })
  champions: string[]

  @IsNotEmpty({ always: true})
  @IsOptional({ groups: [UPDATE] })
  @IsArray({ always: true})
  @Column({ name: 'against_champions', type: 'varchar', array: true })
  againstChampions: string[]

  @IsNotEmpty({ always: true })
  @IsOptional({ groups: [UPDATE] })
  @IsArray({ always: true})
  @Column({ name: 'lanes', type: 'enum', enum: Lanes, array: true })
  lanes: Lanes[]

  @OneToOne(() => User, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({
    name: 'author_id'
  })
  author: User

  @OneToMany(() => UserNotePack,
    userNotePack => userNotePack.user, {
      cascade: true
  })
  users: UserNotePack[]

  @OneToMany(() => MatchNotePack,
    matchNotePack => matchNotePack.match, {
      cascade: true
  })
  matches: MatchNotePack[]

  @IsNotEmpty({ always: true })
  @IsInt({ always: true })
  @IsOptional({ always: true })
  @IsPositive()
  @Column({ name: 'upvote', type: 'int', default: 0 })
  upvote: number

  @IsNotEmpty({ always: true })
  @IsInt({ always: true })
  @IsOptional({ always: true })
  @IsPositive()
  @Column({ name: 'downvote', type: 'int', default: 0 })
  downvote: number

  @IsArray()
  @ValidateNested({ each: true })
  @Column({ type: 'jsonb' })
  @Type(() => NoteDTO)
  notes: NoteDTO[]
}