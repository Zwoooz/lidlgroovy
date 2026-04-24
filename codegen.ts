import 'dotenv/config'
import type { CodegenConfig } from '@graphql-codegen/cli';


async function getToken(): Promise<string> {
  const res = await fetch('https://www.warcraftlogs.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.WCL_CLIENT_ID!,
      client_secret: process.env.WCL_CLIENT_SECRET!
    })
  });
  const { access_token } = await res.json() as { access_token: string };
  return access_token;
}

const token = await getToken();

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://www.warcraftlogs.com/api/v2/client": {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  generates: {
    "src/generated/wclApi.ts": {
      plugins: [
        {
          add: {
            content: '/* eslint-disable */\n/* tslint:disable */\n// @ts-nocheck'
          }
        },
        'typescript',
        'typescript-operations',
        'typed-document-node'
      ],
      documents: ['src/**/*.graphql']
    }
  }
};

export default config;
