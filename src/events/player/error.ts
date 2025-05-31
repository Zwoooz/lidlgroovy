import { AudioPlayerError } from "@discordjs/voice";
import { PlayerEvent } from "../../types/playerEvent.js";
import chalk from "chalk";

const event: PlayerEvent<'error'> = {
  name: 'error',
  execute: (error: AudioPlayerError) => {
    console.error(chalk.red('[Player Error]'), error.message);
  }
};

export default event;
