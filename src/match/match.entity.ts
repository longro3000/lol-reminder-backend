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
  OneToOne, 
  OneToMany
} from 'typeorm'

import { BaseEntity } from '../base.entity'
import { SummonerDTO, Region } from '../summoner/summoner.dto'
import { NotePack } from '../note-pack/note-pack.entity'
import { MatchNotePack } from 'src/match-notePack/match-notePack.entity'

const { CREATE, UPDATE } = CrudValidationGroups

@Entity('match')
export class Match extends BaseEntity {
  @IsNotEmpty({ always: true })
  @IsOptional({ groups: [UPDATE] })
  @IsString({ always: true })
  @MaxLength(40, { always: true })
  @Column({ name: 'summoner', type: 'varchar', length: 40})
  summonerId: string

  @IsNotEmpty({ always: true })
  @IsOptional({ groups: [UPDATE] })
  @IsInt({ always: true })
  @IsPositive()
  @Column({ name: 'matchId', type: 'int'})
  matchId: number

  @IsEnum(Region)
  @IsNotEmpty({ always: true })
  region: Region
  
  @OneToMany(() => MatchNotePack,
  matchNotePack => matchNotePack.match, {
    cascade: true
  })
  notePacks: MatchNotePack[]
}