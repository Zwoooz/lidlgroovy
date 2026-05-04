import fs from 'fs';
import path from 'node:path';
import { ensureDataFile } from './ensureDataFile.js';

export interface WclCharacterLink {
  region: string;
  realm: string;
  name: string;
}

class WclLinkCharUtil {
  private readonly PATH = path.join(process.cwd(), 'data/wclLinks.json');

  private read() {
    ensureDataFile(this.PATH, { users: {} });
    return JSON.parse(fs.readFileSync(this.PATH, 'utf-8'));
  }

  private write(data: object) {
    fs.writeFileSync(this.PATH, JSON.stringify(data, null, 2));
  }

  getCharacter(discordId: string): WclCharacterLink | null {
    return this.read().users[discordId] ?? null;
  }

  linkCharacter(discordId: string, character: WclCharacterLink): void {
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

export const wclLinkCharUtil = new WclLinkCharUtil();
