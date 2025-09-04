import { GuildQueue } from "discord-player";

export default {
  name: 'playerError',
  execute(queue: GuildQueue, error: Error) {
    console.log(`Audio player error event: ${error.message}`);
    console.log(error);

    if (process.env.devId) {
      queue.player.client.users.send(process.env.devId, `
        Audio player error:\`\`\`Message: ${error.message}\n\nError: ${error}\`\`\`
      `);
    }
  }
};
