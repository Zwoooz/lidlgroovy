import {
  ChatInputCommandInteraction,
  GuildMember,
  MessageFlags,
  SlashCommandBuilder
} from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";
import ytdl from "ytdl-core";

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Searches for and plays song/video')
    .addStringOption((option) => option.setName('query')
      .setDescription('Search string')
      .setRequired(true)),

  async execute(interaction: ChatInputCommandInteraction) {
    // TODO: implement ytdl downloading from search string

    // TODO: maybe only register this command in servers and not DM if possible
    if (!interaction.inGuild()) {
      return interaction.reply({ content: 'This command can only be used in a server' });
    }

    if (!(interaction.member as GuildMember).voice.channelId) {
      return interaction.reply({
        content: 'You are not in a voice channel',
        flags: MessageFlags.Ephemeral
      });
    }
    if (
      interaction.guild?.members.me?.voice.channelId &&
      (interaction.member as GuildMember).voice.channelId !==
      interaction.guild.members.me.voice.channelId
    ) {
      return interaction.reply({
        content: 'You are not in my voice channel! (I cannot be in multiple places at once.)',
        flags: MessageFlags.Ephemeral
      });
    }

  }
};
