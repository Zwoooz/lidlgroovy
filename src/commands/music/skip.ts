import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getPlayer } from "../../player/playerManager.js";
import { AudioPlayerStatus } from "@discordjs/voice";
import type { Track } from "../../types/track.js";
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

    return interaction.reply('The current song has been skipped');


    // const player = await getPlayer(interaction.guildId, false);
    //
    // if (!player || player.state.status === AudioPlayerStatus.Idle) {
    //   return interaction.reply('Nothing is playing!');
    // }
    //
    // const track = player.state.resource.metadata as Track;
    // interaction.reply(`Skipping \`${track.title}\``);
    //
    // player.stop();
  }
};
