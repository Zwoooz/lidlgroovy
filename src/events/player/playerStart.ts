import { GuildQueue, GuildQueueEvent, Track } from "discord-player";
import { Metadata } from "../../types/metadata.js";
import { EmbedBuilder, TextChannel } from "discord.js";

export default {
  name: GuildQueueEvent.PlayerStart,
  async execute(queue: GuildQueue, track: Track) {
    const metadata = queue.metadata as Metadata;

    if (metadata.nowPlaying) {
      try {
        await metadata.nowPlaying.delete();
      } catch (error) {
        console.error('Failed to delete previous message: ', error);
      };
    }

    const client = queue.player.client;
    const channelId = metadata.interaction.channelId;
    const channel = client.channels.cache.get(channelId) as TextChannel | undefined;

    if (!channel) {
      return console.error('Channel not found');
    }

    const nowPlayingEmbed = new EmbedBuilder()
      .setTitle('Now playing:')
      .setDescription(`[**${track.title}**](${track.url})`)
      .setColor([219, 177, 17])
      .setFooter({ text: `Queued by @${metadata.interaction.user.username}` });
    if (track.thumbnail) {
      nowPlayingEmbed.setThumbnail(track.thumbnail);
    };

    const nowPlaying = await channel.send({ embeds: [nowPlayingEmbed] });
    metadata.nowPlaying = nowPlaying;
  }
};
