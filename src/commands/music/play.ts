// discord.js core
import {
  ChatInputCommandInteraction,
  GuildMember,
  MessageFlags,
  SlashCommandBuilder
} from "discord.js";

// discord.js voice
import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  createAudioResource,
  AudioPlayerStatus
} from "@discordjs/voice";

// YouTube packages
import ytdl from "@distube/ytdl-core";
import yts from 'yt-search';

// internal managers
import { getPlayer } from "../../player/playerManager.js";
import { getQueue } from "../../player/queueManager.js";
import { getConnection, setConnection } from "../../player/connectionManager.js";

// types
import type { Track } from "../../types/track.js";


export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Searches for and plays song/video')
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

    // non-null assersion used as setRequired is true for the string option
    // WARN: setRequired could be false in the future if integrating play/pause
    const query: string = interaction.options.getString('query')!;
    await interaction.reply({ content: `Searching YouTube for \`${query}\` ...` });

    const result = (await yts(query)).videos[0];
    await interaction.editReply(result.url);

    const track: Track = {
      url: result.url,
      title: result.title,
      thumbnail: result.thumbnail,
      duration: result.timestamp,
      guildId: interaction.guildId,
      requestedBy: interaction.user.username,
    };

    let connection = getConnection(interaction.guildId);

    if (!connection) {
      connection = joinVoiceChannel({
        // non-null assersion used as this is checked above and will never be null
        channelId: (interaction.member as GuildMember).voice.channelId!,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator
      });
      setConnection(interaction.guildId, connection);
    }

    const player = await getPlayer(interaction.guildId);
    const queue = getQueue(interaction.guildId);
    queue.push(track);
    console.log(queue.length);

    if (
      player.state.status === AudioPlayerStatus.Idle &&
      queue.length === 1
    ) {
      connection.subscribe(player);
      const firstTrack = queue.shift();
      if (firstTrack) {
        const stream = ytdl(firstTrack.url, { filter: 'audioonly', dlChunkSize: 0 });
        const resource = createAudioResource(stream, {
          metadata: { guildId: interaction.guildId }
        });
        connection.subscribe(player);
        player.play(resource);
      }
    }
  }
};
