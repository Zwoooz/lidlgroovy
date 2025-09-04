declare namespace NodeJS {
  interface ProcessEnv {
    TOKEN: string;
    TOKEN_DEV: string;
    clientId: string;
    devClientId: string;
    devId: string;
    guildId: string;
  }
}
