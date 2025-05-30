import {
  AudioPlayerStatus,
  AudioPlayerError,
} from '@discordjs/voice';

export interface PlayerEventArgs {
  [AudioPlayerStatus.Idle]: [];
  [AudioPlayerStatus.Playing]: [];
  [AudioPlayerStatus.Paused]: [];
  [AudioPlayerStatus.AutoPaused]: [];
  [AudioPlayerStatus.Buffering]: [];
  error: [error: AudioPlayerError]
}

export interface PlayerEvent<K extends keyof PlayerEventArgs> {
  name: K;
  execute: (...args: PlayerEventArgs[K]) => void;
}
