import { 
  Entity, 
  Column,
  JoinColumn,
  ManyToOne
} from 'typeorm'
import { CrudValidationGroups } from '@nestjsx/crud'
import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsArray,
  MaxLength
} from 'class-validator'

import { BaseEntity } from '../base.entity'

const { CREATE, UPDATE } = CrudValidationGroups

  /* COMPLETE THESE
    lanes: Lanes;
    author: string;
    users: string[];
    upvote: number;
    downvote: number;
    notes: Note[]; 
  */

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
  @IsArray({ always: true})
  @Column({ name: 'champions', type: 'varchar', length: 20, array: true, default: []})
  champions: string[]

  @IsNotEmpty({ always: true})
  @IsOptional({ groups: [UPDATE] })
  @IsArray({ always: true})
  @Column({ name: 'against_champions', type: 'varchar', length: 20, array: true, default: []})
  againstChampions: string[]

  @IsNotEmpty({ always: true })
  @IsOptional({ groups: [UPDATE] })
  lanes: string[]
}