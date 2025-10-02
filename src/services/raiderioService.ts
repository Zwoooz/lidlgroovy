import { Api, GetApiV1CharactersProfileParams, Model4 } from "../api/raiderioApi.js";

interface ApiError {
  statusCode?: number;
  error?: string;
  message: string;
}

type ServiceResponse<T> =
  | { success: true; data: T }
  | { success: false; error: ApiError; userFriendlyError: string };

class RaiderioService {
  private api: Api<unknown>;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.RAIDERIO_TOKEN || '';
    this.api = new Api({
      baseUrl: 'https://raider.io'
    });
  }

  private withApiKey<T extends Record<string, unknown>>(params: T): T & { access_key: string } {
    return {
      ...params,
      access_key: this.apiKey
    };
  }


  private getDiscordFriendlyError(error: ApiError, type: 'character' | 'guild'): string {
    const itemType = type === 'character' ? 'Character' : 'Guild';

    switch (error.statusCode) {
      case 404:
        return `❌ ${itemType} not found. Check your spelling and try again.`;
      case 400:
        return '❌ Something went wrong, this is likely a bug';
      case 429:
        return `⏱️ Too many requests! Please wait a moment before trying again.`;
      case 500:
        return '❌ Something went wrong on RaiderIO\'s side. Please try again later';
      case 502:
      case 503:
        return `🔧 Raider.io is having issues right now. Please try again later.`;
      default:
        return `❌ Something went wrong while fetching ${type} data.`;
    }
  }

  async getCharacterProfile(
    params: Omit<GetApiV1CharactersProfileParams, 'access_key'>
  ): Promise<ServiceResponse<Model4>> {
    try {
      const response = await this.api.v1.getApiV1CharactersProfile(this.withApiKey({
        ...params,
      }));

      const characterProfile: Model4 = await response.json() as Model4;

      return {
        success: true,
        data: characterProfile
      };
    } catch (error) {
      const apiError = await (error as Response).json() as ApiError;
      const friendlyError = this.getDiscordFriendlyError(apiError, 'character');
      return {
        success: false,
        error: {
          statusCode: apiError.statusCode,
          error: apiError.error,
          message: apiError.message
        },
        userFriendlyError: friendlyError
      };
    }
  }
}

export const raiderioService = new RaiderioService();
