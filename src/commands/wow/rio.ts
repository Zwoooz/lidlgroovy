import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName('rio')
    .setDescription('Displays raiderIO information for the provided character')
    .addStringOption((option) => option.setName('name')
      .setDescription('Name of character')
      .setRequired(true)
    )
    .addStringOption((option) => option.setName('server')
      .setDescription('Name of server')
      .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {

    // fetch options from interaction
    const cName: string = interaction.options.getString('name', true);
    const sName: string = interaction.options.getString('server', true);


    // reply before fetching raiderIO data
    await interaction.reply({ content: `Searching RaiderIO for \`${cName}-${sName}\` ...` });

    // fetch data from raiderIO here
  }
};
