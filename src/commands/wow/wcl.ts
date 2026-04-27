import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js';
import { wclService } from '../../services/wclService.js';
import { isEnabled } from '../../utils/envCheck.js';

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

    console.log(character.zoneRankings);
    await interaction.editReply(character.name);
  },
};
