import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { AudioPlayerStatus } from "@discordjs/voice";


export default {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears the queue and stops playback.'),

  async execute(interaction: ChatInputCommandInteraction) {

    if (!interaction.inGuild()) {
      return interaction.reply('This command can only be run in a server');
    }

    const player = await getPlayer(interaction.guildId, false);

    if (!player || player.state.status === AudioPlayerStatus.Idle) {
      return interaction.reply('Nothing is playing!');
    }

    const queue = getQueue(interaction.guildId);

    await interaction.reply(`Cleared \`${queue.length}\` tracks from the queue!`);

    queueMap.delete(interaction.guildId);
    player.stop();
  }
};
