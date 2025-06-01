import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getPlayer } from "../../player/playerManager.js";
import { AudioPlayerPlayingState, AudioPlayerStatus } from "@discordjs/voice";
import type { Track } from "../../types/track.js";


export default {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the currently playing track'),

  async execute(interaction: ChatInputCommandInteraction) {
    if (!interaction.inGuild()) {
      return interaction.reply('This command can only be run in a server');
    }

    const player = await getPlayer(interaction.guildId, false);

    if (!player || player.state.status === AudioPlayerStatus.Idle) {
      return interaction.reply('Nothing is playing');
    }

    const state = player.state as AudioPlayerPlayingState;
    const track = state.resource.metadata as Track;
    interaction.reply(`Skipping \`${track.title}\``);

    player.stop();
  }
};
