import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import * as chrono from 'chrono-node';

export default {
  data: new SlashCommandBuilder()
    .setName('timestamp')
    .setDescription('Creates a discord timestamp')
    .addStringOption((option) =>
      option.setName('time').setDescription('time to create a timestamp from').setRequired(true),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const query = interaction.options.getString('time', true);

    const parsed = chrono.parseDate(query, {
      timezone: undefined,
    });
    if (!parsed) {
      return await interaction.reply(
        'Failed to parse the provided time, please reformat and try again',
      );
    }

    const unixSeconds = Math.floor(parsed.getTime() / 1000);

    return await interaction.reply(`<t:${unixSeconds}:t>`);
  },
};
