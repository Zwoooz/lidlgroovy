import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Api } from "../../api/raiderioApi.js";

export default {
  data: new SlashCommandBuilder()
    .setName('rio')
    .setDescription('Displays raiderIO information for the provided character')
    .addStringOption((option) => option.setName('region')
      .setDescription('Server/Realm region')
      .setChoices(
        { name: 'eu', value: 'eu' },
        { name: 'us', value: 'us' }
      )
    )
    .addStringOption((option) => option.setName('server')
      .setDescription('Name of server/realm')
      .setRequired(true)
    )
    .addStringOption((option) => option.setName('name')
      .setDescription('Name of character')
      .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {

    // fetch options from interaction
    const region: string = interaction.options.getString('region', true);
    const sName: string = interaction.options.getString('server', true)
      .split(' ')
      .join('');
    const cName: string = interaction.options.getString('name', true);
    const rioAPIKey = process.env.RAIDERIO_TOKEN;

    // reply before fetching raiderIO data
    await interaction.reply({ content: `Searching RaiderIO for \`${cName}-${sName}\` ...` });


    const raiderIOApi = new Api({
      baseUrl: 'https://raider.io'
    });
  }
};
