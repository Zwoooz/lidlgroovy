import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import {
  Client,
  Collection,
  ActivityType
} from 'discord.js';

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent', 'GuildVoiceStates'],
  presence: {
    activities: [{ name: '/play', type: ActivityType.Listening }]
  }
});


(async () => {
  client.commands = new Collection();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);


  const foldersPath = path.join(__dirname, 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter(file => file.endsWith('.js') || file.endsWith('.ts'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const { default: command } = await import(filePath);

      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(`[WARNING] The command at "${filePath}" is missing a required "data" or "execute" property.`); // eslint-disable-line max-len
      }
    }
  }

  const eventsPath = path.join(__dirname, 'events/client');
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter(file => file.endsWith('.js') || file.endsWith('.ts'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const { default: event } = await import(filePath);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }
})();

export default client;

client.login(process.env.TOKEN);
