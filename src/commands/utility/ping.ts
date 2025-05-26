import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong! and latency'),

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply(`Pong! \`${Date.now() - interaction.createdTimestamp}ms\``)
  }
}
