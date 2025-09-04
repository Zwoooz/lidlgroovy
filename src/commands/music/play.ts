// discord.js core
import {
  ChatInputCommandInteraction,
  GuildMember,
  MessageFlags,
  SlashCommandBuilder
} from "discord.js";

// discord-player
import { useMainPlayer } from "discord-player";
import { Metadata } from "../../types/metadata.js";


export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Searches for and plays track/video')
    .addStringOption((option) => option.setName('query')
      .setDescription('YouTube link or search string')
      .setRequired(true)),

  async execute(interaction: ChatInputCommandInteraction) {

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

    const query: string = interaction.options.getString('query', true);

    // replies to the before doing anything that will take time as we only have 3 seconds to respond
    await interaction.reply({ content: `Searching for \`${query}\` ...` });


    const player = useMainPlayer();

    try {
      const result = await player.play(
        (interaction.member as GuildMember).voice.channelId!, query, {
        nodeOptions: {
          metadata: { interaction } as Metadata,
        },
      });

      interaction.editReply(
        `${result.track.title} has been added to the queue!`
      );
      setTimeout(async () => {
        return await interaction.deleteReply().catch(console.error);
      }, 3000);
    } catch (error) {
      console.error(error);
      return interaction.editReply('An error occured');
    }
  }
};
