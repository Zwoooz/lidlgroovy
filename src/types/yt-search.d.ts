declare module 'yt-search' {
  export interface YtSearchResult {
    all: YtSearchItem[];
    videos: YtVideo[];
    playlists: YtPlaylist[];
    channels: YtChannel[];
    live: YtVideo[];
  }

  export type YtSearchItem = YtVideo | YtPlaylist | YtChannel;

  export interface YtVideo {
    type: 'video';
    videoId: string;
    url: string;
    title: string;
    description: string;
    image: string;
    thumbnail: string;
    seconds: number;
    timestamp: string;
    duration: YtDuration;
    ago: string;
    views: number;
    author: YtAuthor;
  }

  export interface YtDuration {
    toString(): string;
    seconds: number;
    timestamp: string;
  }

  export interface YtAuthor {
    name: string;
    url: string;
  }

  function yts(query: string): Promise<YtSearchResult>;
  export default yts;
}
