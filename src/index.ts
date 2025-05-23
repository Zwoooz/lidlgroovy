import 'dotenv/config';
import { Client } from 'discord.js';

const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'GuildMembers', 'MessageContent'],
});

client.on('ready', (c: Client<true>) => {
  console.log(`${c.user.username} logged in \n Ready`)
});

client.login(process.env.TOKEN);
