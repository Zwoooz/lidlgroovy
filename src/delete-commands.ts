import { REST, Routes } from 'discord.js';
import 'dotenv/config';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  const rl = readline.createInterface({ input, output });
  const answer = await rl.question('Are you sure you want to delete all registered commands from the application? [y/N]: ');

  rl.close();

  if (answer.toLowerCase() !== 'y') {
    console.log('Cancelled.');
    return;
  }
  rest.put(Routes.applicationCommands(process.env.clientId), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);
})();
