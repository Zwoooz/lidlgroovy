import { AudioPlayerState, AudioPlayerStatus, createAudioResource } from "@discordjs/voice";
import { PlayerEvent } from "../../types/playerEvent.js";
import { getPlayer, playerMap } from "../../player/playerManager.js";
import { getQueue, queueMap } from "../../player/queueManager.js";
import ytdl from "@distube/ytdl-core";
import { EmbedBuilder, TextChannel } from "discord.js";
import client from "../../index.js";
import { getConnection } from "../../player/connectionManager.js";

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
          metadata: nextTrack
        });
        player.play(resource);
        const nowPlayingEmbed = new EmbedBuilder()
          .setTitle('Now playing:')
          .setDescription(`[**${nextTrack.title}**](${nextTrack.url})`)
          .setThumbnail(nextTrack.thumbnail)
          .setColor([219, 177, 17]);

        const channel = await client.channels.fetch(nextTrack.textChannelId) as TextChannel;
        return await channel.send({ content: '', embeds: [nowPlayingEmbed] });
      } else {
        const connection = getConnection(guildId);

        connection?.destroy();
        playerMap.delete(guildId);
        queueMap.delete(guildId);
        console.log('[stateChange] queue empty, destroying player and connection');
      }
    }
  }
};

export default event;
