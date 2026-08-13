import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import * as chrono from 'chrono-node';

export default {
  data: new SlashCommandBuilder()
    .setName('timestamp')
    .setDescription('Creates a discord timestamp')
    .addStringOption((option) =>
      option.setName('time').setDescription('time to create a timestamp from').setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('format')
        .setDescription('format of the timestamp')
        .setChoices(
          { name: 'time', value: 't' },
          { name: 'exact time', value: 'T' },
          { name: 'date', value: 'd' },
          { name: 'full date', value: 'D' },
          { name: 'date & time', value: 'f' },
          { name: 'full date & time', value: 'F' },
          { name: 'relative', value: 'R' },
        )
        .setRequired(false),
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

    const format: string = interaction.options.getString('format', false) || 't';

    const unixSeconds = Math.floor(parsed.getTime() / 1000);

    return await interaction.reply(`<t:${unixSeconds}:${format}>`);
  },
};

// TODO: add per user saved timezones
