import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  // EmbedBuilder,
  MessageFlags,
  SlashCommandBuilder,
} from 'discord.js';
import { wclService } from '../../services/wclService.js';
import { isEnabled } from '../../utils/envCheck.js';
import { WclCharacter } from '../../types/wcl.js';
import { generateWclImage } from '../../utils/wclCanvas.js';
import { WclCharacterLink, wclLinkCharUtil } from '../../utils/wclLinkChar.js';

export default {
  data: new SlashCommandBuilder()
    .setName('wcl')
    .setDescription('Displays WCL information for the provided character')
    .addStringOption((option) =>
      option
        .setName('region')
        .setDescription('Realm region')
        .setChoices({ name: 'eu', value: 'eu' }, { name: 'us', value: 'us' })
        .setRequired(false),
    )
    .addStringOption((option) =>
      option.setName('realm').setDescription('Name of realm').setRequired(false),
    )
    .addStringOption((option) =>
      option.setName('name').setDescription('Name of character').setRequired(false),
    )
    .addIntegerOption((option) =>
      option
        .setName('difficulty')
        .setDescription('Difficulty')
        .setChoices(
          { name: 'mythic', value: 5 },
          { name: 'heroic', value: 4 },
          { name: 'normal', value: 3 },
          { name: 'LFR', value: 1 },
        ),
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    if (!isEnabled('WCL_CLIENT_ID', 'WCL_CLIENT_SECRET')) {
      return await interaction.reply({
        content: 'This command is disabled',
        flags: MessageFlags.Ephemeral,
      });
    }

    const region = interaction.options.getString('region');
    const realm = interaction.options.getString('realm');
    const name = interaction.options.getString('name');
    const difficulty = interaction.options.getInteger('difficulty') ?? undefined;

    let character: WclCharacterLink;
    if (!region || !realm || !name) {
      const link = wclLinkCharUtil.getCharacter(interaction.user.id);
      if (!link) {
        return await interaction.reply(`No character provided.
Link your character to your discord user with \`/wcl-link\` or provide character details`);
      }
      character = link;
    } else {
      character = { region, realm: realm.split(' ').join(''), name };
    }

    await interaction.reply({
      content: `Searching WCL for \`${character.name}-${character.realm}\`...`,
    });

    const data = await wclService.getCharacter(
      character.name,
      character.realm,
      character.region,
      difficulty,
    );
    const wclCharacter = data.characterData?.character as WclCharacter;

    if (!wclCharacter) return await interaction.editReply('Character not found.');

    const imageBuffer = await generateWclImage(wclCharacter);
    const attachment = new AttachmentBuilder(imageBuffer, { name: 'wcl.png' });

    await interaction.editReply({ content: '', files: [attachment] });
  },
};
