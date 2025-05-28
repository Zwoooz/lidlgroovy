import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';
import { Client, Collection } from 'discord.js';

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent', 'GuildVoiceStates'],
});

(async () => {
  client.commands = new Collection();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);


  const foldersPath = path.join(__dirname, 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(
      (file) => file.endsWith('.js') || file.endsWith('.ts')
    );

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const { default: command } = await import(filePath);

      if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`); //eslint-disable-line max-len
      }
    }
  }

  const clientEventsPath = path.join(__dirname, 'events/client');
  const clientEventFiles = fs.readdirSync(clientEventsPath).filter(
    (file) => file.endsWith('.js') || file.endsWith('.ts')
  );

  for (const file of clientEventFiles) {
    const filePath = path.join(clientEventsPath, file);
    const { default: event } = await import(filePath);

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }


  // NOTE: below code should be able to handle player event files once player is implemented properly
 
  // const playerEventsPath = path.join(__dirname, 'events/player');
  // const playerEventFiles = fs.readdirSync(playerEventsPath).filter(
  //   (file) => file.endsWith('.js') || file.endsWith('.ts')
  // );
  //
  // for (const file of playerEventFiles) {
  //   const filePath = path.join(playerEventsPath, file);
  //   const { default: event } = await import(filePath);
  //
  //   if (event.once) {
  //     player.once(event.name, (...args) => event.execute(...args));
  //   } else {
  //     player.on(event.name, (...args) => event.execute(...args));
  //   }
  // }
})();



client.login(process.env.TOKEN);
