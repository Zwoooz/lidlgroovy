import { Api, GetApiV1CharactersProfileParams, Model4 } from "../api/raiderioApi.js";

interface ApiError {
  statusCode?: number;
  error?: string;
  message: string;
}

interface HTMLError {
  status: number;
  statusText: string;
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


  private getDiscordFriendlyError(
    error: ApiError | HTMLError,
    type: 'character' | 'guild'): string {
    const itemType = type === 'character' ? 'Character' : 'Guild';
    let statusCode: number;

    if (!('statusCode' in error)) {
      statusCode = (error as HTMLError).status;
    } else {
      statusCode = (error as ApiError).statusCode!;
    }

    switch (statusCode) {
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
      try {
        const apiError = await (error as Response).json() as ApiError;
        return {
          success: false,
          error: {
            statusCode: apiError.statusCode,
            error: apiError.error,
            message: apiError.message
          },
          userFriendlyError: this.getDiscordFriendlyError(apiError, 'character')
        };
      } catch {
        // likely got HTML response (raiderio probably down)
        const htmlError = error as HTMLError;
        return {
          success: false,
          error: {
            statusCode: htmlError.status,
            message: htmlError.statusText
          },
          userFriendlyError: this.getDiscordFriendlyError(htmlError, 'character')
        };
      }
    }
  }
}

export const raiderioService = new RaiderioService();
