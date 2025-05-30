import {
  ChatInputCommandInteraction,
  GuildMember,
  MessageFlags,
  SlashCommandBuilder
} from "discord.js";
import {
  DiscordGatewayAdapterCreator,
  joinVoiceChannel,
  createAudioResource
} from "@discordjs/voice";
import ytdl from "@distube/ytdl-core";
import yts from 'yt-search';
import { getPlayer } from "../../player/playerManager.js";

export default {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Searches for and plays song/video')
    .addStringOption((option) => option.setName('query')
      .setDescription('Search string')
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

    // replies to the command interaction so discord knows it's responding
    interaction.reply({ content: `Searching YouTube for \`${query}\` ...` });

    const results = await yts(query);
    interaction.editReply(results.videos[0].url);


    // voice connection and player 
    // TODO: move into multiple files, with player events and such

    // creates a voice connection in the voice channel the user currently is
    const connection = joinVoiceChannel({
      // non-null assersion used as this is checked above and will never be null
      channelId: (interaction.member as GuildMember).voice.channelId!,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild?.voiceAdapterCreator as DiscordGatewayAdapterCreator
    });

    // NOTE: this should happen somewhere else
    // const connection = getVoiceConnection(interaction.guildId);

    const player = await getPlayer(interaction.guildId);

    // reads url and creates a readable stream that only contains audio
    const stream = ytdl(results.videos[0].url, {
      filter: 'audioonly',
      dlChunkSize: 0
    });

    // creates a playable resource from the stream
    const resource = createAudioResource(stream);

    // attatches(subscribes) the connection to the player and plays the resource
    connection.subscribe(player);
    player.play(resource);
  }
};
