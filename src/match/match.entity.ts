import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsPositive,
  IsInt,
  IsEnum
} from 'class-validator'
import { CrudValidationGroups } from '@nestjsx/crud'
import { 
  Entity,
  Column,
  JoinColumn,
  OneToOne 
} from 'typeorm'

import { BaseEntity } from '../base.entity'
import { SummonerDTO, Server } from '../summoner/summoner.dto'
import { NotePack } from '../note-pack/note-pack.entity'

const { CREATE, UPDATE } = CrudValidationGroups

@Entity('match')
export class Match extends BaseEntity {
  @IsNotEmpty({ always: true })
  @IsOptional({ groups: [UPDATE] })
  @IsString({ always: true })
  @MaxLength(40, { always: true })
  @Column({ name: 'summoner', type: 'varchar', length: 40})
  summoner: string

  @IsNotEmpty({ always: true })
  @IsOptional({ groups: [UPDATE] })
  @IsInt({ always: true })
  @IsPositive()
  @Column({ name: 'matchId', type: 'int', length: 40})
  matchId: number

  @IsEnum(Server)
  @IsNotEmpty({ always: true })
  server: Server
  
  @OneToOne(() => NotePack, {
    onDelete: 'SET NULL'
  })
  @JoinColumn({
    name: 'note_pack_id'
  })
  notePack: string
}