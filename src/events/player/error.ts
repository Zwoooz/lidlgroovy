import { GuildQueue, GuildQueueEvent } from "discord-player";

export default {
  name: GuildQueueEvent.Error,
  execute(queue: GuildQueue, error: Error) {
    console.log(`General player error event: ${error.message}`);
    console.log(error);

    if (process.env.devId) {
      queue.player.client.users.send(
        process.env.devId, `
        General player error event:\`\`\`Message: ${error.message}\n\nError: ${error}\`\`\`
      `);
    }
  }
};
