import { GuildQueue, PlayerEvent, Track } from "discord-player";

export default {
  name: 'playerStart',
  execute(queue: GuildQueue, track: Track) {
    console.log(`Started playing ${track.title}, queued by ${queue.metadata.interaction.user.username}`);
    // TODO: Fix type/intellisense for metadata
    // TODO: Make this remove old embed if it had one and send an updated one
  }
};
