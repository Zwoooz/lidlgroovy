import { Track } from "../types/track.js";


export const queueMap = new Map<string, Track[]>;

export function getQueue(guildId: string): Track[] {
  let queue = queueMap.get(guildId);

  if (!queue) {
    queue = [];
    queueMap.set(guildId, queue);
  }

  return queue;
}

