import { 
  Entity, 
  Column,
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
  IsEmail,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'

import { UserNotePack } from '../user-notePack/user-notePack.entity';
import { SummonerDTO } from '../summoner/summoner.dto'
import { BaseEntity } from '../base.entity'


const { UPDATE } = CrudValidationGroups

    summoner: Summoner;
@Entity('user')
export class User extends BaseEntity {
  
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @MaxLength(40, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @Column({ name: 'username', type: 'varchar', length: 40, unique: true, nullable: true})
  username: string

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @Column({ name: 'password', type: 'varchar', length: 100})
  password: string

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @Column({ name: 'avatar', type: 'varchar', length: 100})
  avatar: string

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @IsEmail({ require_tld: false }, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @Column({ name: 'email', type: 'varchar', length: 40, unique: true, nullable: true})
  email: string

  @IsNotEmpty({ always: true })
  @IsBoolean({ always: true })
  @IsOptional({ always: true })
  @Column({ name: 'is_admin', type: 'boolean', default: false })
  isAdmin: boolean

  @OneToMany(() => UserNotePack,
    userNotePack => userNotePack.notePack, {
      cascade: true
  })
  notePacks: UserNotePack[]

  @IsArray()
  @ValidateNested({ each: true })
  @Column({ type: 'jsonb' })
  @Type(() => SummonerDTO)
  notes: SummonerDTO[]
}