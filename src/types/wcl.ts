import { Character } from '../generated/wclApi.js';

interface WclRankings {
  bestPerformanceAverage?: number;
  medianPerformanceAverage?: number;
  difficulty: number;
  metric: string;
  partition: number;
  zone: number;
  size: number;
  allStars: {
    partition: number;
    spec: string;
    points: number;
    possiblePoints: number;
    rank: number;
    regionRank: number;
    serverRank: number;
    rankPercent: number;
    total: number;
  }[];
  rankings: {
    encounter: {
      id: number;
      name: string;
    };
    rankPercent?: number;
    medianPercent: number;
    lockedIn: boolean;
    totalKills: number;
    fastestKill: number;
    spec: string;
    bestSpec: string;
    bestAmount: number;
    bestRank: {
      rank_id: number;
      class: number;
      spec: number;
      per_second_amount: number;
      ilvl: number;
      fight_metadata: number;
    };
  }[];
}

export interface WclCharacter extends Omit<Character, 'zoneRankings'> {
  zoneRankings: WclRankings;
}
