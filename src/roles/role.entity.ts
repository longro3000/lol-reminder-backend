import { Entity, Column } from 'typeorm'
import {
  IsString,
  MaxLength,
  IsNotEmpty,
  IsOptional,
  IsArray,
} from 'class-validator'
import { CrudValidationGroups } from '@nestjsx/crud'

import { BaseEntity } from '../base.entity'

const { UPDATE } = CrudValidationGroups

@Entity('roles')
export class Role extends BaseEntity {
  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @MaxLength(40, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'varchar', length: 40, unique: true })
  name: string

  @IsNotEmpty({ always: true })
  @IsArray({ always: true })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'text', array: true })
  permissions: string[]

  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string
}
