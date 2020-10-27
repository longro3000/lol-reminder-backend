export const FETCH_MATCH_LIST = 'FETCH_MATCH_LIST'
export const FETCH_MATCH_LIST_SUCCESS = 'FETCH_MATCH_LIST_SUCCESS'
export const FETCH_MATCH = 'FETCH_MATCH'
export const FETCH_MATCH_SUCCESS = 'FETCH_MATCH_SUCCESS'

export interface MatchShort {
  platformId: string,
  gameId: number,
  champion: number,
  queue: number,
  season: number,
  timestamp: number,
  role: string,
  lane: string,
  
}

export interface MatchList {
  matches: MatchShort[],
  startIndex: number,
  endIndex: number,
  totalGames: number
}

export interface Ban {
  championId: number,
  pickTurn: number            
}

export interface Team {
  teamId: number,
  win: 'Fail' | 'Win',
  firstBlood: boolean,
  firstTower: boolean,
  firstInhibitor: boolean,
  firstBaron: boolean,
  firstDragon: boolean,
  firstRiftHerald: boolean,
  towerKills: number,
  inhibitorKills: number,
  baronKills: number,
  dragonKills: number,
  vilemawKills: number,
  riftHeraldKills: number,
  dominionVictoryScore: number,
  bans: Ban[]
}

export interface Delta {
  [key: string] : number
}

export interface TimelineStats {
  participantId: number,
  creepsPerMinDeltas: Delta,
  xpPerMinDeltas: Delta,
  goldPerMinDeltas: Delta,
  csDiffPerMinDeltas: Delta,
  xpDiffPerMinDeltas: Delta,
  damageTakenPerMinDeltas: Delta,
  damageTakenDiffPerMinDeltas: Delta,
  role: string,
  lane: string
}

export interface Stats {
  participantId: number,
  win: boolean,
  item0: number,
  item1: number,
  item2: number,
  item3: number,
  item4: number,
  item5: number,
  item6: number,
  kills: number,
  deaths: number,
  assists: number,
  largestKillingSpree: number,
  largestMultiKill: number,
  killingSprees: number,
  longestTimeSpentLiving: number,
  doubleKills: number,
  tripleKills: number,
  quadraKills: number,
  pentaKills: number,
  unrealKills: number,
  totalDamageDealt: number,
  magicDamageDealt: number,
  physicalDamageDealt: number,
  booleanDamageDealt: number,
  largestCriticalStrike: number,
  totalDamageDealtToChampions: number,
  magicDamageDealtToChampions: number,
  physicalDamageDealtToChampions: number,
  booleanDamageDealtToChampions: number,
  totalHeal: number,
  totalUnitsHealed: number,
  damageSelfMitigated: number,
  damageDealtToObjectives: number,
  damageDealtToTurrets: number,
  visionScore: number,
  timeCCingOthers: number,
  totalDamageTaken: number,
  magicalDamageTaken: number,
  physicalDamageTaken: number,
  booleanDamageTaken: number,
  goldEarned: number,
  goldSpent: number,
  turretKills: number,
  inhibitorKills: number,
  totalMinionsKilled: number,
  neutralMinionsKilled: number,
  neutralMinionsKilledTeamJungle: number,
  neutralMinionsKilledEnemyJungle: number,
  totalTimeCrowdControlDealt: number,
  champLevel: number,
  visionWardsBoughtInGame: number,
  sightWardsBoughtInGame: number,
  wardsPlaced: number,
  wardsKilled: number,
  firstBloodKill: boolean,
  firstBloodAssist: boolean,
  firstTowerKill: boolean,
  firstTowerAssist: boolean,
  firstInhibitorKill: boolean,
  firstInhibitorAssist: boolean,
  combatPlayerScore: number,
  objectivePlayerScore: number,
  totalPlayerScore: number,
  totalScoreRank: number,
  playerScore0: number,
  playerScore1: number,
  playerScore2: number,
  playerScore3: number,
  playerScore4: number,
  playerScore5: number,
  playerScore6: number,
  playerScore7: number,
  playerScore8: number,
  playerScore9: number,
  perk0: number,
  perk0Var1: number,
  perk0Var2: number,
  perk0Var3: number,
  perk1: number,
  perk1Var1: number,
  perk1Var2: number,
  perk1Var3: number,
  perk2: number,
  perk2Var1: number,
  perk2Var2: number,
  perk2Var3: number,
  perk3: number,
  perk3Var1: number,
  perk3Var2: number,
  perk3Var3: number,
  perk4: number,
  perk4Var1: number,
  perk4Var2: number,
  perk4Var3: number,
  perk5: number,
  perk5Var1: number,
  perk5Var2: number,
  perk5Var3: number,
  perkPrimaryStyle: number,
  perkSubStyle: number,
  statPerk0: number,
  statPerk1: number,
  statPerk2: number
}


export interface Participant  {
  participantId: number,
  teamId: number,
  championId: number,
  spell1Id: number,
  spell2Id: number,
  stats: Stats,
  timeline: TimelineStats
}

export interface Player {
  platformId: string,
  accountId: string,
  summonerName: string,
  summonerId: string,
  currentPlatformId: string,
  currentAccountId: string,
  matchHistoryUri: string,
  profileIcon: number
}

export interface ParticipantIdentity {
  participantId: 1,
  player: Player
}

export interface LoLMatch {
  gameId: number,
  platformId: string,
  gameCreation: number,
  gameDuration: number,
  queueId: number,
  mapId: number,
  seasonId: number,
  gameVersion: string,
  gameMode: string,
  gameType: string,
  teams: Team[],
  participants: Participant[],
  participantIdentities: ParticipantIdentity[]
}

