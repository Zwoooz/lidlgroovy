import { readFileSync } from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const forbiddenStrings = ["TOKEN_DEV", "devClientId", "devId"];

const filesToCheck = [
  path.join(__dirname, "../src/index.ts"),
  path.join(__dirname, "../src/deploy-commands.ts"),
];

describe("Correct environment variables check", () => {
  filesToCheck.forEach((filePath: string) => {
    it(`should not contain forbidden strings in ${path.basename(filePath)}`, () => {
      const content = readFileSync(filePath, { encoding: "utf-8" });
      const lines = content.split('\n');
      const violations: string[] = [];

      forbiddenStrings.forEach((forbiddenString: string) => {
        lines.forEach((line, index) => {
          if (line.includes(forbiddenString)) {
            const lineNumber = index + 1;
            violations.push(
              `"${forbiddenString}" found on line ${lineNumber}: ${line.trim()}`
            );
          }
        });
      });

      if (violations.length > 0) {
        throw new Error(
          `Found forbidden strings in ${path.basename(filePath)}:\n` +
          violations.map(v => `  - ${v}`).join('\n') + '\n\n' +
          `File: ${filePath}`
        );
      }

      expect(violations).toHaveLength(0);
    });
  });
});
