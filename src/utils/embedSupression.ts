import fs from 'fs'
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATH = path.join(__dirname, '../data/embedSupression.json');

export function getChannels(): string[] {
  const data = JSON.parse(fs.readFileSync(PATH, 'utf-8'));
  return data.channels
}

export function addChannel(channelId: string): void {
  const data = JSON.parse(fs.readFileSync(PATH, 'utf-8'))
  if (!data.channels.includes(channelId)) {
    data.channels.push(channelId);
    fs.writeFileSync(PATH, JSON.stringify(data, null, 2))
  }
}

export function removeChannel(channelId: string): void {
  const data = JSON.parse(fs.readFileSync(PATH, 'utf-8'));
  data.channels = data.channels.filter((id: string) => id !== channelId);
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
}
