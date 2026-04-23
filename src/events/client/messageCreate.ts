import { Events, Message } from "discord.js";
import { getChannels } from "../../utils/embedSupression.js";

export default {
  name: Events.MessageCreate,
  async execute(message: Message) {
    if (message.author.bot) return;
    if (!getChannels().includes(message.channelId)) return;

    if (message.embeds.length > 0) {
      await message.suppressEmbeds(true);
    }
  }
};
