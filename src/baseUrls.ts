export interface Urls {
  [key: string] : string
}
/*
  BASE URLS
*/
export const champions = 'http://ddragon.leagueoflegends.com/cdn/10.5.1/data/en_US/champion.json'

export const items = 'http://ddragon.leagueoflegends.com/cdn/10.5.1/data/en_US/item.json'

export const spells = 'http://ddragon.leagueoflegends.com/cdn/10.5.1/data/en_US/summoner.json'

export const icons = 'http://ddragon.leagueoflegends.com/cdn/10.5.1/data/en_US/profileicon.json'

export const iconBaseUrls: Urls = {
  champion : 'http://ddragon.leagueoflegends.com/cdn/10.18.1/img/champion/',
  championPassive: 'http://ddragon.leagueoflegends.com/cdn/10.18.1/img/passive/',
  championAbility: 'http://ddragon.leagueoflegends.com/cdn/10.18.1/img/spell/',
  item: 'http://ddragon.leagueoflegends.com/cdn/10.18.1/img/item/',
  spell: 'http://ddragon.leagueoflegends.com/cdn/10.18.1/img/spell/',
  summonerIcon: 'http://ddragon.leagueoflegends.com/cdn/10.18.1/img/profileicon/',
  miniMap: 'http://ddragon.leagueoflegends.com/cdn/6.8.1/img/map/'
}

export const baseUrls: Urls = {
  eu: 'https://euw1.api.riotgames.com/lol/',
  na: 'https://na1.api.riotgames.com/lol/',
  kr: 'https://kr.api.riotgames.com/lol/'
}