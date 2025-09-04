import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Track, useQueue } from "discord-player";


export default {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Shows the queue'),

  async execute(interaction: ChatInputCommandInteraction) {

    if (!interaction.inGuild()) {
      return interaction.reply('This command can only be run in a server');
    }

    const queue = useQueue(interaction.guildId);

    if (!queue) {
      return interaction.reply('Nothing is playing');
    }

    const nowPlaying = queue.currentTrack!;

    const queueEmbed = new EmbedBuilder()
      .setTitle('Now playing:')
      .setDescription(`[**${nowPlaying.title}**](${nowPlaying.url})`)
      .setColor([219, 177, 17]);
    if (nowPlaying.thumbnail) {
      queueEmbed.setThumbnail(nowPlaying.thumbnail);
    };

    const upNext = queue.tracks.data.slice(0, 5);
    const embedMessage: string[] = [];
    if (upNext.length > 0) {

      upNext.forEach((track: Track, index: number) => {
        embedMessage.push(`${index + 1}. [${track.title}](${track.url})`);
      });
      const embedMessageString = embedMessage.join('\n');
      queueEmbed.addFields({ name: 'Up next:', value: embedMessageString });
    }
    await interaction.reply({ embeds: [queueEmbed] });
  }
};
