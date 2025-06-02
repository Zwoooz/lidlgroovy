import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getQueue } from "../../player/queueManager.js";
import { getPlayer } from "../../player/playerManager.js";
import { AudioPlayerStatus } from "@discordjs/voice";
import { Track } from "../../types/track.js";


export default {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Shows the queue'),

  async execute(interaction: ChatInputCommandInteraction) {

    if (!interaction.inGuild()) {
      return interaction.reply('This command can only be run in a server');
    }

    const player = await getPlayer(interaction.guildId, false);

    if (!player || player.state.status === AudioPlayerStatus.Idle) {
      return interaction.reply('Nothing is playing');
    }


    const nowPlaying = player.state.resource.metadata as Track;


    const queueEmbed = new EmbedBuilder()
      .setTitle('Now playing:')
      .setDescription(`[**${nowPlaying.title}**](${nowPlaying.url})`)
      .setThumbnail(nowPlaying.thumbnail)
      .setColor([219, 177, 17]);

    const queue = getQueue(interaction.guildId);

    if (queue.length) {
      const queueArr: string[] = [];


      for (let i = 0; i < 5; i++) {
        if (!queue[i]) break;
        queueArr.push(`**${i + 1}**: [${queue[i].title}](${queue[i].url})`);
      }

      const queueString = queueArr.join('\n');

      queueEmbed.addFields({ name: 'Up next:', value: queueString });

      if (queue.length > 5) {
        queueEmbed.setFooter({ text: `And ${queue.length - queueArr.length} other item(s)` });
      }
    }
    await interaction.reply({ embeds: [queueEmbed] });
  }
};
