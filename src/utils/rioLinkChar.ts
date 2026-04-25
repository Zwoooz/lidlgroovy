import fs from 'fs';
import path from 'node:path';
import { Region } from '../generated/raiderioApi.js';

const PATH = path.join(process.cwd(), 'data/rioLinks.json');

export interface Character {
  region: Region;
  realm: string;
  name: string;
}

export function getRioCharacter(discordId: string): Character | null {
  const data = JSON.parse(fs.readFileSync(PATH, 'utf-8'));
  return data.users[discordId] ?? null;
}

export function linkRioCharacter(discordId: string, character: Character): void {
  const data = JSON.parse(fs.readFileSync(PATH, 'utf-8'));
  data.users[discordId] = character;
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
}

export function unlinkRioCharacter(discordId: string): void {
  const data = JSON.parse(fs.readFileSync(PATH, 'utf-8'));
  delete data.users[discordId];
  fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
}
