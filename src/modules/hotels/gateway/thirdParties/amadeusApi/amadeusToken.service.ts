import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AmadeusAccessTokenResponse } from './dto/amadeusAccessTokenResponse.dto';

@Injectable()
export class AmadeusTokenService {
  constructor(private readonly http: HttpService) {}

  // Properties to store access token and expiry time
  private accessToken: string | undefined;
  private expiresAt: number | undefined;

  // Method to retrieve access token
  async getAccessToken(): Promise<string> {
    // Check if access token is undefined or expired
    if (!this.accessToken || this.isExpired()) {
      // If access token is undefined or expired, request a new one
      const { access_token, expires_in } = await this.requestNewAccessToken();
      // Store the new access token and its expiry time
      this.accessToken = access_token;
      this.expiresAt = Date.now() + expires_in * 1000;
    }
    // Return the access token
    return this.accessToken;
  }

  // Method to check if access token is expired
  private isExpired(): boolean {
    return this.expiresAt && Date.now() >= this.expiresAt;
  }

  // Method to request a new access token
  private async requestNewAccessToken(): Promise<AmadeusAccessTokenResponse> {
    try {
      // Make request to Amadeus API to obtain access token
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
      // Return the response data containing access token
      return res.data;
    } catch (err) {
      // Handle errors
      throw new Error(
        err?.message + ': ' + JSON.stringify(err?.response?.data),
      );
    }
  }
}
