import { SummonerDTO } from './../summoner/summoner.dto';

export enum UserType {
  User = 'user',
  Admin = 'admin'
}

export interface AuthenticatedUser {
  id: string,
  type: UserType,
  email: string, 
  avatar: string,
  summoners: SummonerDTO[],
  username: string,
  isAdmin: boolean,
  permissions?: string[]
}

export type LoginResponse = {
  accessToken: string
} & AuthenticatedUser

export type JwtTokenPayload = {
  id: string,
  email: string,
  type: UserType
}
