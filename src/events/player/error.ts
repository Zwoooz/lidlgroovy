import { GuildQueueEvent, type GuildQueue } from "discord-player";

export default {
  name: GuildQueueEvent.Error,
  execute: (queue: GuildQueue, error: Error) => {
    console.log(`General player error event: ${error.message}`);
    console.log(error);
  }
};
