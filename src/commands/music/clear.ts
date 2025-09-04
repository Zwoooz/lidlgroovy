import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { useQueue } from "discord-player";


export default {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears the queue and stops playback'),

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.inGuild()) {
      return interaction.reply('This command can only be run in a server');
    }

    const queue = useQueue(interaction.guildId);

    if (!queue) {
      return interaction.reply('This server does not have an active player session.');
    }

    if (!queue.isPlaying()) {
      return interaction.reply('There is no track playing.');
    }

    queue.delete();

    interaction.reply('The queue has been deleted!');

    setTimeout(async () => {
      return await interaction.deleteReply().catch(console.error);
    }, 3000);
  }
};
