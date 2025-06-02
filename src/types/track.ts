export interface Track {
  url: string;
  title: string | undefined;
  guildId: string;
  requestedBy: string;
  thumbnail: string;
  duration: string;
  textChannelId: string;
}
