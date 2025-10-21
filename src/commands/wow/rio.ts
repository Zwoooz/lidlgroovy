import {
  ChatInputCommandInteraction,
  ColorResolvable,
  EmbedBuilder,
  SlashCommandBuilder
} from "discord.js";
import { raiderioService } from "../../services/raiderioService.js";
import { Region } from "../../api/raiderioApi.js";

export default {
  data: new SlashCommandBuilder()
    .setName('rio')
    .setDescription('Displays raiderIO information for the provided character')
    .addStringOption((option) => option.setName('region')
      .setDescription('Realm region')
      .setChoices(
        { name: 'eu', value: 'eu' },
        { name: 'us', value: 'us' }
      )
      .setRequired(true)
    )
    .addStringOption((option) => option.setName('realm')
      .setDescription('Name of realm')
      .setRequired(true)
    )
    .addStringOption((option) => option.setName('name')
      .setDescription('Name of character')
      .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {

    // fetch options from interaction
    const region = interaction.options.getString('region', true);
    const realm = interaction.options.getString('realm', true);
    const name = interaction.options.getString('name', true);

    // reply before fetching raiderIO data
    await interaction.reply({ content: `Searching RaiderIO for \`${name}-${realm}\`...` });

    const response = await raiderioService.getCharacterProfile({
      region: region as Region,
      realm: realm,
      name: name,
      fields: [
        'mythic_plus_scores_by_season:current',
        'raid_progression:current-tier',
        'gear',
      ].join(',')
    });
    if (!response.success) {
      if (process.env.devId && response.error.statusCode == 400) {
        interaction.client.users.send(
          process.env.devId,
          `raiderioService:\`\`\`Something went wrong on the client side:\n${JSON.stringify(response.error)}\`\`\``); //eslint-disable-line max-len
      }
      return await interaction.editReply({
        content: response.userFriendlyError || 'Something went wrong!',
      });
    }

    const embed = new EmbedBuilder()
      .setColor(
        response.data.mythic_plus_scores_by_season![0].segments.all.color as ColorResolvable
      )
      .setTitle(`${response.data.name}-${response.data.realm}`)
      .setDescription(
        `**${response.data.active_spec_name} ${response.data.class}**\n` +
        `\`${response.data.gear?.item_level_equipped}\` Item Level\n\u200b`
      )
      .setThumbnail(response.data.thumbnail_url)
      .addFields({
        name: 'M+ score:',
        value: `\`${response.data.mythic_plus_scores_by_season![0].scores.all.toString()}\``
      });

    if (Object.values(response.data.raid_progression!)[0].summary) {
      const raidName = Object.keys(response.data.raid_progression!)[0];
      const raidProg = Object.values(response.data.raid_progression!)[0].summary;
      const curveResponse = await raiderioService.getCharacterProfile({
        region: region as Region,
        realm: realm,
        name: name,
        fields: `raid_achievement_curve:${raidName}`
      });

      if (!curveResponse.success) {
        if (process.env.devId && curveResponse.error.statusCode == 400) {
          interaction.client.users.send(
            process.env.devId,
            `raiderioService:\`\`\`Something went wrong on the client side:\n${JSON.stringify(curveResponse.error)}\`\`\``); //eslint-disable-line max-len
        }
        return await interaction.editReply({
          content: curveResponse.userFriendlyError || 'Something went wrong!',
        });
      }

      let curve: string = 'No curve';

      if (curveResponse.data.raid_achievement_curve[0]) {
        if (Object.values(curveResponse.data.raid_achievement_curve[0]).length == 3) {
          curve = '[CE]';
        } else if (Object.values(curveResponse.data.raid_achievement_curve[0]).length == 2) {
          curve = '[AOTC]';
        }
      }

      embed.addFields({
        name: 'Raiding:',
        value: raidName.charAt(0).toUpperCase() + raidName.slice(1).replace('-', ' ') + ' ' + `\`${raidProg} - ${curve}\`` //eslint-disable-line max-len
      });

    } else {
      embed.addFields({ name: 'Raid progression:', value: 'No raid progression this tier.' });
    }


    embed.addFields(
      {
        name: '\u200b',
        value: `Fetched from [**RaiderIO**](${response.data.profile_url})
        <t:${Math.floor(Date.now() / 1000)}:R>`
      },
    );

    return await interaction.editReply({ content: '', embeds: [embed] });
  }
};
