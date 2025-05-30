import { AudioPlayerError } from "@discordjs/voice";
import { PlayerEvent } from "../../types/playerEvent.js";

const event: PlayerEvent<'error'> = {
  name: 'error',
  execute: (error: AudioPlayerError) => {
    console.error('[Player Error]', error.message);
  }
};

export default event;
// WARN: Denna ovan kan nog vara direkt i början?
