declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN: string;
    clientId: string;
    devId?: string;
    YOUTUBE_COOKIE?: string;
    RAIDERIO_TOKEN?: string;
    WCL_CLIENT_ID?: string;
    WCL_CLIENT_SECRET?: string;
  }
}
