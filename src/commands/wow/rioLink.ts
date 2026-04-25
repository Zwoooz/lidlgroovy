import { SlashCommandBuilder, ChatInputCommandInteraction, MessageFlags } from "discord.js";
import { raiderioService } from "../../services/raiderioService.js";
import { Region } from "../../generated/raiderioApi.js";
import { linkRioCharacter } from "../../utils/rioLinkChar.js";

export default {
  data: new SlashCommandBuilder()
    .setName('rio-link')
    .setDescription('Links rio character to discord user')
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
    const character = {
      region: interaction.options.getString('region', true) as Region,
      realm: interaction.options.getString('realm', true),
      name: interaction.options.getString('name', true)
    };

    await interaction.reply({
      content: `Searching RaiderIO for \`${character.name}-${character.realm}\`...`,
      flags: MessageFlags.Ephemeral
    });

    // check if character actually exists
    const response = await raiderioService.getCharacterProfile({
      region: character.region,
      realm: character.realm,
      name: character.name,
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

    linkRioCharacter(interaction.user.id, character);
    return await interaction.editReply(
      `\`${character.name}-${character.realm}\` is now linked to your discord user`
    );

  }
};
