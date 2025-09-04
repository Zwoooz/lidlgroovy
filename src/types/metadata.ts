import { ChatInputCommandInteraction, Message } from "discord.js";

export interface Metadata {
  interaction: ChatInputCommandInteraction;
  nowPlaying?: Message;
}
