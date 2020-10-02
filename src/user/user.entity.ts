import { 
  Entity, 
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  BeforeInsert
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
import * as bcrypt from 'bcrypt'

import { Role } from '../roles/role.entity'
import { UserNotePack } from '../user-notePack/user-notePack.entity';
import { SummonerDTO } from '../summoner/summoner.dto'
import { BaseEntity } from '../base.entity'

const { UPDATE } = CrudValidationGroups

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
  summoners: SummonerDTO[]

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password)
  }
}