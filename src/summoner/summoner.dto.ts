import {
  IsString,
  IsNotEmpty,
  IsEnum
} from 'class-validator'

export enum Server {
  EUW = "euw1",
  BRAZIL = "br1",
  KOREAN = "kr",
  NA = "na"
}

export class SummonerDTO {
  @IsEnum(Server)
  @IsNotEmpty({ always: true })
  server: Server

  @IsString({ always: true })
  @IsNotEmpty({ always: true })
  summoner: string
}