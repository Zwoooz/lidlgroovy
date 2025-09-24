import { Api, GetApiV1CharactersProfileParams, HttpResponse } from "../api/raiderioApi.js";

interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  userFriendlyError?: string; // Specifically if responding with discord responses
}

class RaiderioService {
  private api: Api<unknown>;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.RAIDERIO_TOKEN || '';
    this.api = new Api({
      baseUrl: 'https://raider.io'
    });
  }

  private getDiscordFriendlyError(error: any, type: 'character' | 'guild'): string {
    const itemType = type === 'character' ? 'Character' : 'Guild';

    switch (error.statusCode) {
      case 404:
        return `❌ ${itemType} not found. Check your spelling and try again.`;
      case 400:
        return `❌ Invalid ${type} information provided. Please check region, realm, and name.`;
      case 429:
        return `⏱️ Too many requests! Please wait a moment before trying again.`;
      case 500:
      case 502:
      case 503:
        return `🔧 Raider.io is having issues right now. Please try again later.`;
      default:
        return `❌ Something went wrong while fetching ${type} data.`;
    }
  }

  private normalizeRealmName(realm: string): string {
    return realm.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/'/g, '')
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u');
  }

  async getCharacterProfile(
    region: string,
    realm: string,
    name: string,
    fields?: string[]
  ): Promise<ServiceResponse<any>> {
    try {
      const character = await this.api.v1.getApiV1CharactersProfile({
        region: region.toLowerCase(),
        realm: realm,
        name: name,
        fields: fields || ['mythic_plus_best_runs']
      });

      return {
        success: true,
        data: character
      };
    } catch (error) {
      const friendlyError = this.getDiscordFriendlyError(error, 'character');
      return {
        success: false,
        error: error.message,
        userFriendlyError: friendlyError
      };
    }
  }
}

export const raiderioService = new RaiderioService();
