import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import { wclService } from '../../services/wclService.js';
import { isEnabled } from '../../utils/envCheck.js';
import { WclRankings } from '../../types/wcl.js';

export default {
  data: new SlashCommandBuilder()
    .setName('wcl')
    .setDescription('Displays WCL information for the provided character')
    .addStringOption((option) =>
      option
        .setName('region')
        .setDescription('Realm region')
        .setChoices({ name: 'eu', value: 'eu' }, { name: 'us', value: 'us' })
        .setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('realm').setDescription('Name of realm').setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('name').setDescription('Name of character').setRequired(true),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    if (!isEnabled('WCL_CLIENT_ID', 'WCL_CLIENT_SECRET')) {
      return await interaction.reply({
        content: 'This command is disabled',
        flags: MessageFlags.Ephemeral,
      });
    }

    // fetch options from interaction
    const region = interaction.options.getString('region', true);
    const realm = interaction.options.getString('realm', true).split(' ').join('');
    const name = interaction.options.getString('name', true);

    // reply before fetching raiderIO data
    await interaction.reply({ content: `Searching WCL for \`${name}-${realm}\`...` });

    const data = await wclService.getCharacter(name, realm, region);
    const character = data.characterData?.character;

    if (!character) return await interaction.editReply('Character not found.');

    const zoneRankings = character.zoneRankings as WclRankings;

    function getParseColor(parse: number): string {
      if (parse < 25) return '\x1b[1;30m'; // grey
      if (parse < 50) return '\x1b[1;32m'; // green
      if (parse < 75) return '\x1b[1;34m'; // blue
      if (parse < 95) return '\x1b[1;45m'; // purple
      if (parse < 99) return '\x1b[1;41m'; // orange
      if (parse < 100) return '\x1b[1;35m'; // pink
      return '\x1b[1;33m';
    }

    const reset = '\x1b[0m';

    const averageRankingText = `Best performance average: ${getParseColor(
      zoneRankings.bestPerformanceAverage,
    )}${zoneRankings.bestPerformanceAverage.toFixed(2)}${reset}`;

    const maxLength = Math.max(...zoneRankings.rankings.map((r) => r.encounter.name.length));
    const rankingsText = zoneRankings.rankings
      .map(
        (r) =>
          `${r.encounter.name.padEnd(maxLength)}: ${getParseColor(r.rankPercent)}${Math.floor(r.rankPercent)}${reset}`,
      )
      .join('\n');

    const embed = new EmbedBuilder()
      .setTitle(`WCL profile for \`${character.name}-${character.server.name}\``)
      .setDescription('--Class, Spec and ilvl here--')
      .addFields({
        name: 'Rankings: ',
        value: `\`\`\`ansi\n${averageRankingText}\n\n${rankingsText}\n\`\`\``,
      });

    await interaction.editReply({ content: '', embeds: [embed] });
  },
};
