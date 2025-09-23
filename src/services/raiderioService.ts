import { Api, GetApiV1CharactersProfileParams } from "../api/raiderioApi.js";

interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  userFriendlyError?: string; // Specifically if responding with discord responses
}

class raiderioService {
  private api: Api;

  constructor() {
    this.api = new Api({
      baseUrl: 'https://raider.io'
    });
  }


  async getCharacterProfile(
    region: string,
    realm: string,
    name: string,
    fields?: string[]
  ): Promise<ServiceResponse<GetApiV1CharactersProfileParams>> {
    try {
      const character = await this.api.GetApiV1CharactersProfiole({
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
      return {
        success: false,
        error: error.message
      };
    }
  }
}
