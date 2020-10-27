import {
  IsString,
  IsNotEmpty,
  IsEnum
} from 'class-validator'

export enum Region {
  EUW = "euw1",
  BRAZIL = "br1",
  KOREAN = "kr",
  NA = "na"
}

export class SummonerDTO {
  @IsEnum(Region)
  @IsNotEmpty({ always: true })
  region: Region

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  summoner: string
}