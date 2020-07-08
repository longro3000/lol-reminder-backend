import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm'
import { 
  IsBoolean,
  IsOptional
 } from 'class-validator'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ 
    name: 'created_at',
    type: 'timestamptz'
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz'
  })
  updatedAt: Date

  @IsBoolean({ always: true })
  @IsOptional({ always: true })
  @Column({ name: 'is_banned', default: false })
  isBanned?: boolean
}