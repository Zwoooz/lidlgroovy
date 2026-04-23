import fs from 'fs';
import path from 'node:path';

const PATH = path.join(process.cwd(), 'data/embedSupression.json');

export function getChannels(): string[] {
  const data = JSON.parse(fs.readFileSync(PATH, 'utf-8'));
  return data.channels;
}

export function addChannel(channelId: string): void {
  const data = JSON.parse(fs.readFileSync(PATH, 'utf-8'));
  if (!data.channels.includes(channelId)) {
    data.channels.push(channelId);
    fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
  }
}

export function removeChannel(channelId: string): void {
  const data = JSON.parse(fs.readFileSync(PATH, 'utf-8'));
  data.channels = data.channels.filter((id: string) => id !== channelId);
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
}
