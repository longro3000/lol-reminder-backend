import { SummonerDTO } from './../summoner/summoner.dto';

export enum UserType {
  User = 'user',
  Admin = 'admin',
  Guest = 'guest'
}

export interface AuthenticatedUser {
  id: string,
  type: UserType,
  email: string, 
  avatar: string,
  summoners?: SummonerDTO[],
  username: string,
  isAdmin: boolean
}

export type LoginResponse = {
  accessToken: string
} & AuthenticatedUser

export type JwtTokenPayload = {
  id: string,
  email: string,
  username: string,
  type: UserType
}
