import { Events, Message } from 'discord.js';
import { getChannels } from '../../utils/embedSupression.js';

export default {
  name: Events.MessageUpdate,
  async execute(oldMessage: Message, newMessage: Message) {
    if (newMessage.author.bot) return;
    if (!getChannels().includes(newMessage.channelId)) return;

    if (newMessage.embeds.length > 0) {
      await newMessage.suppressEmbeds(true);
    }
  },
};
