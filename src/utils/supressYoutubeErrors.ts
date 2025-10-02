/**
 * Suppresses non-critical YouTube extractor errors from console output
 * This prevents [YOUTUBEJS] and [youtubei.js] error spam while maintaining
 * other important logs
 */

const originalLog = console.log;
const originalWarn = console.warn;

// Checks if a log message is a YouTube extractor error that should be suppressed
function isYouTubeExtractorError(args: unknown[]): boolean {
  if (typeof args[0] === "string") {
    return (
      args[0].startsWith("[YOUTUBEJS]") ||
      args[0].startsWith("[youtubei.js]")
    );
  }
  return false;
}

// Enables YouTube error suppression by overriding console methods
export function suppressYouTubeErrors(): void {
  console.log = function (...args) {
    if (isYouTubeExtractorError(args)) {
      return;
    }
    originalLog.apply(console, args);
  };

  console.warn = function (...args) {
    if (isYouTubeExtractorError(args)) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

// Restores original console methods
export function restoreConsole(): void {
  console.log = originalLog;
  console.warn = originalWarn;
}

export default suppressYouTubeErrors;
