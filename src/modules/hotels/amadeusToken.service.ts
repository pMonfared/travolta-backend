import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AmadeusAccessTokenResponse } from './dto/amadeusAccessTokenResponse.dto';

@Injectable()
export class AmadeusTokenService {
  constructor(private readonly http: HttpService) {}
  private accessToken: string | undefined;
  private expiresAt: number | undefined;

  async getAccessToken(): Promise<string> {
    if (!this.accessToken || this.isExpired()) {
      const { access_token, expires_in } = await this.requestNewAccessToken();
      this.accessToken = access_token;
      this.expiresAt = Date.now() + expires_in * 1000;
    }
    return this.accessToken;
  }

  private isExpired(): boolean {
    return this.expiresAt && Date.now() >= this.expiresAt;
  }

  private async requestNewAccessToken(): Promise<AmadeusAccessTokenResponse> {
    try {
      const res = await this.http.axiosRef.post(
        process.env.AMADEUS_ACCESS_TOKEN_URI,
        {
          grant_type: 'client_credentials',
          client_id: process.env.AMADEUS_CLIENT_ID,
          client_secret: process.env.AMADEUS_CLIENT_SECRET,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      return res.data;
    } catch (err) {
      throw new Error(
        err?.message + ': ' + JSON.stringify(err?.response?.data),
      );
    }
  }
}
