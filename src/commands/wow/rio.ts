import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { raiderioService } from "../../services/raiderioService.js";

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
    const region: string = interaction.options.getString('region', true);
    const realm: string = interaction.options.getString('realm', true)
      .split(' ')
      .join('');
    const name: string = interaction.options.getString('name', true);

    // reply before fetching raiderIO data
    await interaction.reply({ content: `Searching RaiderIO for \`${name}-${realm}\` ...` });

    const response = await raiderioService.getCharacterProfile({
      region: region,
      realm: realm,
      name: name
    });

    if (!response.success) {
      return await interaction.editReply({
        content: response.userFriendlyError || 'Something went wrong!'
      });
    }

    const embed = new EmbedBuilder({
      thumbnail = 
    })

    await interaction.editReply({ content: 'Fetching done, check console log output' });
    console.log(await response.data.json());
  }
};
