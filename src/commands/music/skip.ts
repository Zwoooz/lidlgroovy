import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { useQueue } from "discord-player";


export default {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the currently playing track'),

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

    queue.node.skip();

    interaction.reply('The current song has been skipped');

    setTimeout(async () => {
      return await interaction.deleteReply().catch(console.error);
    }, 3000);
  }
};
