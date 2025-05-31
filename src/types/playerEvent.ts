import {
  AudioPlayerStatus,
  AudioPlayerError,
  AudioPlayerState
} from '@discordjs/voice';

export interface PlayerEventArgs {
  [AudioPlayerStatus.Idle]: [];
  [AudioPlayerStatus.Playing]: [];
  [AudioPlayerStatus.Paused]: [];
  [AudioPlayerStatus.AutoPaused]: [];
  [AudioPlayerStatus.Buffering]: [];
  stateChange: [oldState: AudioPlayerState, newState: AudioPlayerState];
  error: [error: AudioPlayerError],
}

export interface PlayerEvent<K extends keyof PlayerEventArgs> {
  name: K;
  execute: (...args: PlayerEventArgs[K]) => void;
}
