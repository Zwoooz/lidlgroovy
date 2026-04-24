import { DocumentNode, print } from 'graphql';
import {
  GetCharacterDocument,
  GetCharacterQuery,
  GetCharacterQueryVariables
} from '../generated/wclApi.js';

const WCL_API = 'https://www.warcraftlogs.com/api/v2/client';

class WclService {
  private token: string | null = null;
  private expiresAt: number = 0;

  private async getToken(): Promise<string> {
    if (this.token && Date.now() < this.expiresAt) return this.token;

    const response = await fetch('https://www.warcraftlogs.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.WCL_CLIENT_ID,
        client_secret: process.env.WCL_CLIENT_SECRET
      })
    });
    const { access_token, expires_in } =
      await response.json() as { access_token: string; expires_in: number };
    this.token = access_token;
    this.expiresAt = Date.now() + (expires_in - 60) * 1000;
    return this.token!;
  }

  async query<TData, TVariables>(
    document: DocumentNode,
    variables: TVariables
  ): Promise<TData> {
    const token = await this.getToken();
    const response = await fetch(WCL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ query: print(document), variables })
    });
    const { data, errors } = await response.json() as { data: TData; errors?: unknown };
    if (errors) throw errors;
    return data as TData;
  }

  async getCharacter(
    name: string,
    serverSlug: string,
    serverRegion: string
  ): Promise<GetCharacterQuery> {
    return this.query<GetCharacterQuery, GetCharacterQueryVariables>(
      GetCharacterDocument,
      { name, serverSlug, serverRegion }
    );
  }
}

export const wclService = new WclService;
