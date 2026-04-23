import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { addChannel, getChannels, removeChannel } from "../../utils/embedSupression.js";

export default {
  data: new SlashCommandBuilder()
    .setName('toggle-embed-deletion')
    .setDescription('Toggles automatic deletion of embeds on messages in the channel'),

  async execute(interaction: ChatInputCommandInteraction) {
    const channelId = interaction.channelId;
    const channels = getChannels();

    if (channels.includes(channelId)) {
      removeChannel(channelId);
      await interaction.reply(`Embed deletion is now **OFF** for ${interaction.channel?.url}`);
    } else {
      addChannel(channelId);
      await interaction.reply(`Embed deletion is now **ON** for ${interaction.channel?.url}`);
    }

  }
};
