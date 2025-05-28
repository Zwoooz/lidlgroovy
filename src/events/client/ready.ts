import { Client, Events, } from "discord.js";
import chalk from 'chalk';

export default {
  name: Events.ClientReady,
  once: true,
  execute(client: Client) {
    // non-null assertion used as this runs after the 'ready' event and will never be null
    console.log(chalk.yellow(client.user!.username), 'is', chalk.blue('ready!'));
  }
};
