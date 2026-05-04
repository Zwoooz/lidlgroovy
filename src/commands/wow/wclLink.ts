import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  MessageFlags,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  MessageComponentInteraction,
} from 'discord.js';
import { wclService } from '../../services/wclService.js';
import { isEnabled } from '../../utils/envCheck.js';
import { wclLinkCharUtil } from '../../utils/wclLinkChar.js';

export default {
  data: new SlashCommandBuilder()
    .setName('wcl-link')
    .setDescription('Links/unlinks WarcraftLogs character to discord user')
    .addStringOption((option) =>
      option.setName('region').setDescription('Realm region').setChoices(
        { name: 'eu', value: 'eu' },
        { name: 'us', value: 'us' },
      ),
    )
    .addStringOption((option) => option.setName('realm').setDescription('Name of realm'))
    .addStringOption((option) => option.setName('name').setDescription('Name of character')),

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

    const character = wclLinkCharUtil.getCharacter(interaction.user.id);

    const collectorFilter = (i: MessageComponentInteraction) => i.user.id === interaction.user.id;

    if (character) {
      if (!region || !realm || !name) {
        const unlinkButton = new ButtonBuilder()
          .setCustomId('unlink')
          .setLabel('YES UNLINK')
          .setStyle(ButtonStyle.Danger);

        const noButtonGreen = new ButtonBuilder()
          .setCustomId('noGreen')
          .setLabel('No')
          .setStyle(ButtonStyle.Success);
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
          unlinkButton,
          noButtonGreen,
        );

        const response = await interaction.reply({
          content: `Are you sure you want to unlink \`${character.name}-${character.realm}\` from your discord user?
Cancelling <t:${Math.floor((Date.now() + 60000) / 1000)}:R>`,
          flags: MessageFlags.Ephemeral,
          components: [row],
          withResponse: true,
        });

        try {
          const confirmation = await response.resource?.message?.awaitMessageComponent({
            filter: collectorFilter,
            time: 60_000,
          });

          if (confirmation?.customId === 'noGreen') {
            return await interaction.editReply({
              content: 'Unlink attempt cancelled!',
              components: [],
            });
          }

          wclLinkCharUtil.unlinkCharacter(interaction.user.id);
          return await interaction.editReply({
            content: `\`${character.name}-${character.realm}\` is no longer linked to your discord user`,
            components: [],
          });
        } catch {
          return await interaction.editReply({
            content: 'Confirmation not recieved, cancelling',
            components: [],
          });
        }
      }

      const yesButton = new ButtonBuilder()
        .setCustomId('yes')
        .setLabel('Yes')
        .setStyle(ButtonStyle.Success);

      const noButton = new ButtonBuilder()
        .setCustomId('no')
        .setLabel('No')
        .setStyle(ButtonStyle.Secondary);
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(yesButton, noButton);
      const response = await interaction.reply({
        content: `Your discord user is already linked to \`${character.name}-${character.realm}\`.
Do you want to overwrite this?\nCancelling <t:${Math.floor((Date.now() + 60000) / 1000)}:R>`,
        flags: MessageFlags.Ephemeral,
        components: [row],
        withResponse: true,
      });

      try {
        const confirmation = await response.resource?.message?.awaitMessageComponent({
          filter: collectorFilter,
          time: 60_000,
        });

        if (confirmation?.customId === 'no') {
          return await interaction.editReply({
            content: 'Link attempt cancelled!',
            components: [],
          });
        }
      } catch {
        return await interaction.editReply({
          content: 'Confirmation not recieved, cancelling',
          components: [],
        });
      }
    }

    if (!region || !realm || !name) {
      return await interaction.reply(
        "No character is linked to your discord user, enter it's details to add it!",
      );
    }

    const newCharacter = { region, realm: realm.split(' ').join(''), name };

    const searchingReply = {
      content: `Searching WCL for \`${newCharacter.name}-${newCharacter.realm}\`...`,
      components: [],
    };
    if (!interaction.replied) {
      await interaction.reply(searchingReply);
    } else {
      await interaction.editReply(searchingReply);
    }

    const data = await wclService.getCharacter(newCharacter.name, newCharacter.realm, newCharacter.region);
    if (!data.characterData?.character) {
      return await interaction.editReply({ content: 'Character not found on WarcraftLogs.' });
    }

    wclLinkCharUtil.linkCharacter(interaction.user.id, newCharacter);
    return await interaction.editReply(
      `\`${newCharacter.name}-${newCharacter.realm}\` is now linked to your discord user`,
    );
  },
};
