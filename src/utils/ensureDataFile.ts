import fs from 'fs';
import path from 'node:path';

export function ensureDataFile(filePath: string, content: object): void {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  }
}
