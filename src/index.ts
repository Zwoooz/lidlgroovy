import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import 'dotenv/config';

import {
  Client,
  Collection,
  ActivityType
} from 'discord.js';

import { Player } from 'discord-player';
import { DefaultExtractors } from '@discord-player/extractor';
import { YoutubeiExtractor } from 'discord-player-youtubei';
import suppressYouTubeErrors from './utils/supressYoutubeErrors.js';
const client = new Client({
  intents: [
    'Guilds',
    'GuildMessages',
    'GuildMembers',
    'MessageContent',
    'GuildVoiceStates'
  ],
  presence: {
    activities: [{ name: '/play', type: ActivityType.Listening }]
  }
});


// @ts-expect-error | for some reason the Player doesn't accept the Client type (even non-augmented)
const player = new Player(client);

// FIX: https://github.com/LuanRT/YouTube.js/issues/1043
// FIX: tl;dr: providing a player id serves as a temporary fix
// eslint-disable-next-line
// TODO: start fetching this id from https://raw.githubusercontent.com/llama-spec/metronome-player-Extractor/refs/heads/main/cachedPlayers/latest 
await player.extractors.register(YoutubeiExtractor, {
  streamOptions: {
    useClient: "WEB_EMBEDDED"
  },
  generateWithPoToken: true,
  innertubeConfigRaw: {
    player_id: '0004de42'
  }
});
await player.extractors.loadMulti(DefaultExtractors);


// client commands
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

// client events
const clientEventsDir = path.join(__dirname, 'events/client');
const clientEventFiles = fs
  .readdirSync(clientEventsDir)
  .filter(file => file.endsWith('.js') || file.endsWith('.ts'));

for (const file of clientEventFiles) {
  const filePath = path.join(clientEventsDir, file);
  const { default: clientEvent } = await import(filePath);

  if (clientEvent.once) {
    client.once(clientEvent.name, (...args) => clientEvent.execute(...args));
  } else {
    client.on(clientEvent.name, (...args) => clientEvent.execute(...args));
  }
}


// player events
const playerEventsDir = path.join(__dirname, 'events/player');
const playerEventFiles = fs
  .readdirSync(playerEventsDir)
  .filter(file => file.endsWith('.js') || file.endsWith('.ts'));

for (const file of playerEventFiles) {
  const filePath = path.join(playerEventsDir, file);
  const { default: playerEvent } = await import(filePath);

  if (playerEvent && 'name' in playerEvent && 'execute' in playerEvent) {
    // TODO: check unknown type here, find correct types
    player.events.on(playerEvent.name, (...args: unknown[]) => playerEvent.execute(...args));
  } else {
    console.log(`[WARNING] The player event at "${filePath}" is missing a required "name" or "execute" property.`); // eslint-disable-line max-len
  }
}




export default client;

client.login(process.env.TOKEN);

// Supress non-critical errors from youtubei.js library
suppressYouTubeErrors();
