import {
  createAudioPlayer,
  AudioPlayer,
  AudioPlayerError,
  AudioPlayerStatus,
} from "@discordjs/voice";
import fs from 'node:fs';
import path from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";

import { PlayerEvent, PlayerEventArgs } from "../types/playerEvent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const playerMap = new Map<string, AudioPlayer>();
const playerGuildMap = new Map<AudioPlayer, string>();

type EventName = keyof PlayerEventArgs;

function handleEvent<K extends EventName>(
  player: AudioPlayer,
  event: PlayerEvent<K>
) {
  if (event.name === 'error') {
    player.on('error', event.execute as (...args: [AudioPlayerError]) => void);
  } else {
    player.on(event.name as AudioPlayerStatus, (...args: []) => {
      (event.execute as (...args: []) => void)(...args);
    });
  }
}

async function attachPlayerEvents(player: AudioPlayer) {
  const eventsDir = path.join(__dirname, '../events/player');
  const eventFiles = fs
    .readdirSync(eventsDir)
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsDir, file);

    const { default: event }: { default: PlayerEvent<keyof PlayerEventArgs> } =
      await import(filePath);

    if (!event) {
      console.log(chalk.yellowBright('[WARNING]'), `The player event at "${filePath}" is undefined`); // eslint-disable-line max-len
      continue;
    }
    if ('name' in event && 'execute' in event) {
      handleEvent(player, event);
    } else {
      console.log(chalk.yellowBright('[WARNING]'), `The player event at "${filePath}" is missing a required "name" or "execute" property`); //eslint-disable-line max-len
    }
  }
}

export async function getPlayer(guildId: string): Promise<AudioPlayer> {
  let player = playerMap.get(guildId);

  if (!player) {
    player = createAudioPlayer();
    await attachPlayerEvents(player);
    playerMap.set(guildId, player);
    playerGuildMap.set(player, guildId);
  }

  return player;
}

export function getGuildIdFromPlayer(player: AudioPlayer): string | undefined {
  return playerGuildMap.get(player);
}
