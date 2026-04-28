export interface WclRankings {
  bestPerformanceAverage: number;
  medianPerformanceAverage: number;
  difficulty: number;
  metric: string;
  partition: number;
  zone: number;
  rankings: {
    encounter: {
      id: number;
      name: string;
    };
    rankPercent: number;
    medianPercent: number;
    lockedIn: boolean;
    totalKills: number;
    fastestKill: number;
    spec: string;
    bestSpec: string;
    bestAmount: number;
  }[];
}
