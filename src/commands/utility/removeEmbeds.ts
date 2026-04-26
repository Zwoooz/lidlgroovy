import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export default {
  data: new SlashCommandBuilder()
    .setName('delete-embeds')
    .setDescription('Deletes embeds on messages')
    .addIntegerOption((option) =>
      option
        .setName('amount')
        .setDescription('Amount of messages to check (default 100)')
        .setRequired(false),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const limit = interaction.options.getInteger('amount') ?? 100;

    await interaction.deferReply();

    const messages = await interaction.channel?.messages.fetch({ limit: limit });
    if (!messages || messages?.size === 0) {
      return await interaction.editReply({ content: 'No messages found' });
    }
    let deletedCounter = 0;
    for (const message of messages.values()) {
      if (message.embeds.length > 0) {
        await message.suppressEmbeds(true);
        deletedCounter += 1;
      }
    }
    if (deletedCounter == 0) {
      return await interaction.editReply({ content: 'No embeds found on messages' });
    }
    await interaction.editReply(`Deleted \`${deletedCounter}\` embeds`);
  },
};
