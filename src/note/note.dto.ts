import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsPositive,
  IsInt
} from 'class-validator'

export class NoteDTO {
  @IsString({ always: true })
  @IsOptional({ always: true })
  condition: string

  @IsInt({ always: true })
  @IsPositive({ always: true })
  @IsOptional({ always: true })
  time: number

  @IsNotEmpty({ always: true })
  @IsString({ always: true })
  @IsOptional({ always: true })
  content: string
}