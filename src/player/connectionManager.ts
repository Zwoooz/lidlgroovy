import { VoiceConnection } from "@discordjs/voice";

const connectionMap = new Map<string, VoiceConnection>();

export function setConnection(guildId: string, connection: VoiceConnection) {
  connectionMap.set(guildId, connection);
}

export function getConnection(guildId: string): VoiceConnection | undefined {
  return connectionMap.get(guildId);
}
