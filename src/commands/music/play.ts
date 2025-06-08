// discord.js core
import {
  ChatInputCommandInteraction,
  EmbedBuilder,
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
import play from 'play-dl';

// internal managers
import { getPlayer } from "../../player/playerManager.js";
import { getQueue } from "../../player/queueManager.js";
import { getConnection, setConnection } from "../../player/connectionManager.js";

// types
import type { Track } from "../../types/track.js";


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

    // fetches the query option from the slash command
    // non-null assersion used as setRequired is true for the string option
    // WARN: setRequired could be false in the future if integrating play/pause
    const query: string = interaction.options.getString('query')!;

    // replies to the before doing anything that will take time as we only have 3 seconds to respond
    await interaction.reply({ content: `Searching YouTube for \`${query}\` ...` });

    // searches youtube for the query and edits the previous reply
    const search = await play.search(query, { limit: 1 });
    const result = search[0];

    // creates a track from the video
    const track: Track = {
      url: result.url,
      title: result.title,
      thumbnail: result.thumbnails[0].url,
      duration: result.durationRaw,
      guildId: interaction.guildId,
      requestedBy: interaction.user.username,
      textChannelId: interaction.channelId,
    };

    const player = await getPlayer(interaction.guildId);

    // tries to get an existing connection or creates one if one doesn't exist
    let connection = getConnection(interaction.guildId);

    if (!connection) {
      connection = joinVoiceChannel({
        // non-null assersion used as this is checked above and will never be null
        channelId: (interaction.member as GuildMember).voice.channelId!,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator
      });
      setConnection(interaction.guildId, connection);
      connection.subscribe(player);
    }

    const queue = getQueue(interaction.guildId);

    // pushes the created track to the queue
    queue.push(track);

    // starts playing the track if there is only one track in the queue and the player is idle
    if (
      player.state.status === AudioPlayerStatus.Idle &&
      queue.length === 1
    ) {
      const firstTrack = queue.shift();
      if (firstTrack) {
        const stream = ytdl(firstTrack.url, {
          filter: 'audioonly',
          dlChunkSize: 0,
          highWaterMark: 1 << 25 // 32MB buffer
        });
        const resource = createAudioResource(stream, {
          metadata: firstTrack
        });
        player.play(resource);

        const nowPlayingEmbed = new EmbedBuilder()
          .setTitle('Now playing:')
          .setDescription(`[**${firstTrack.title}**](${firstTrack.url})`)
          .setThumbnail(firstTrack.thumbnail)
          .setColor([219, 177, 17]);

        return await interaction.editReply({ content: '', embeds: [nowPlayingEmbed] });
      }
    }
    await interaction.editReply(`\`${result.title}\` added to queue`);
    setTimeout(async () => {
      return await interaction.deleteReply().catch(console.error);
    }, 3000);
  }
};
