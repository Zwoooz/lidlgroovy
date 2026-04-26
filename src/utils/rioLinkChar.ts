import fs from 'fs';
import path from 'node:path';
import { Region } from '../generated/raiderioApi.js';
import { ensureDataFile } from './ensureDataFile.js';

export interface Character {
  region: Region;
  realm: string;
  name: string;
}

class RioLinkCharUtil {
  private readonly PATH = path.join(process.cwd(), 'data/rioLinks.json');

  private read() {
    ensureDataFile(this.PATH, { users: {} });
    return JSON.parse(fs.readFileSync(this.PATH, 'utf-8'));
  }

  private write(data: object) {
    fs.writeFileSync(this.PATH, JSON.stringify(data, null, 2));
  }

  getCharacter(discordId: string): Character | null {
    return this.read().users[discordId] ?? null;
  }

  linkCharacter(discordId: string, character: Character): void {
    const data = this.read();
    data.users[discordId] = character;
    this.write(data);
  }

  unlinkCharacter(discordId: string): void {
    const data = this.read();
    delete data.users[discordId];
    this.write(data);
  }
}

export const rioLinkCharUtil = new RioLinkCharUtil();
