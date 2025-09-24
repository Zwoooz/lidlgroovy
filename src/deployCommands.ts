import chalk from 'chalk';
import { REST, type RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js';
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];

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
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`); //eslint-disable-line max-len
    }
  }
}

const rest = new REST().setToken(process.env.TOKEN_DEV);

try {
  console.log(`Started refreshing ${commands.length} application (/) commands.`);
  commands.forEach(command => {
    console.log(chalk.green('[COMMANDS]'), 'Adding:', '/' + command.name);
  });
  const data = await rest.put(
    Routes.applicationCommands(process.env.devClientId),
    { body: commands },
  ) as RESTPostAPIApplicationCommandsJSONBody[];
  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
  console.log(error);
}
