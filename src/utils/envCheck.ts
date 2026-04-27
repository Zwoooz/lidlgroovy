export function envCheck() {
  const envVars = [
    'TOKEN',
    'clientId',
    'devId',
    'YOUTUBE_COOKIE',
    'RAIDERIO_TOKEN',
    'WCL_CLIENT_ID',
    'WCL_CLIENT_SECRET',
  ] as const;

  type envEntry = { message: string; severity: 'warn' | 'error' | 'fatal' };

  const wclDisabled: envEntry = {
    message: 'WCL related commands will be disabled.',
    severity: 'error',
  };

  const envMessages: Partial<Record<keyof NodeJS.ProcessEnv, envEntry>> = {
    TOKEN: { message: 'Bot cannot function, exiting...', severity: 'fatal' },
    devId: { message: 'You will not get DMs about errors.', severity: 'warn' },
    YOUTUBE_COOKIE: { message: 'Youtube streaming will not be considered.', severity: 'warn' },
    RAIDERIO_TOKEN: {
      message: 'RaiderIO API requests will be limited to 200/minute',
      severity: 'warn',
    },
    WCL_CLIENT_ID: wclDisabled,
    WCL_CLIENT_SECRET: wclDisabled,
  };

  for (const key of envVars) {
    if (!process.env[key]) {
      const entry = envMessages[key];
      if (!entry) continue;

      switch (entry.severity) {
        case 'fatal':
          console.error(`Missing '${key}' entry in .env: ${entry.message}`);
          process.exit(1);

        // eslint-disable-next-line no-fallthrough
        case 'error':
          console.error(`Missing '${key}' entry in .env: ${entry.message}`);
          break;

        case 'warn':
          console.warn(`Missing '${key}' entry in .env: ${entry.message}`);
          break;
      }
    }
  }
}

export const isEnabled = (...keys: Array<keyof NodeJS.ProcessEnv>) =>
  keys.every((key) => !!process.env[key]);
