import { AudioPlayerState, AudioPlayerStatus, createAudioResource } from "@discordjs/voice";
import { PlayerEvent } from "../../types/playerEvent.js";
import { getPlayer } from "../../player/playerManager.js";
import { getQueue } from "../../player/queueManager.js";
import ytdl from "@distube/ytdl-core";

const event: PlayerEvent<'stateChange'> = {
  name: 'stateChange',
  execute: async (oldState, newState) => {

    if (
      oldState.status !== newState.status &&
      newState.status === AudioPlayerStatus.Idle
    ) {
      type ExtendedPlayerState = AudioPlayerState & {
        resource: { metadata?: { guildId?: string } }
      }

      console.log('[Player] Playing --> Idle, Playing next track');
      const guildId = (oldState as ExtendedPlayerState).resource.metadata?.guildId;
      if (!guildId) return console.log('guildId not found, returning');

      const player = await getPlayer(guildId);
      const queue = getQueue(guildId);
      const nextTrack = queue.shift();

      if (nextTrack) {
        const stream = ytdl(nextTrack.url, {
          filter: 'audioonly',
          dlChunkSize: 0,
          highWaterMark: 1 << 25 // 32MB buffer
        });
        const resource = createAudioResource(stream, {
          metadata: { guildId: nextTrack.guildId }
        });
        player.play(resource);
      } else {
        console.log('queue empty:');
      }
    }
  }
};

export default event;
