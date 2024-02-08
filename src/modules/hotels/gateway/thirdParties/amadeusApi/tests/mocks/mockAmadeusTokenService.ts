// Import the required interfaces and types
import { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { AmadeusAccessTokenResponse } from '../../api/interfaces/amadeusAccessTokenResponse.dto';
import { AmadeusTokenService } from '../../api/amadeusToken.service';
import { Injectable } from '@nestjs/common';

// Create a manual mock for HttpService
export class MockHttpService {
  // Mock the post method
  post<T = any>(): Observable<AxiosResponse<T>> {
    // Mocking the response for the request
    const mockResponse: AxiosResponse<AmadeusAccessTokenResponse> = {
      data: {
        access_token: 'mock_access_token',
        expires_in: 3600, // assuming token expiry in 1 hour
        token_type: 'Bearer',
      },
      status: 200,
      statusText: 'OK',
      headers: {}, // Mocking headers
      config: { url: '', method: '', headers: {} as any }, // Mocking config
    };
    // Return an observable of the mocked response
    return of(mockResponse as AxiosResponse<T>);
  }
}

// Decorate the mock class with Injectable
@Injectable()
export class MockAmadeusTokenService extends AmadeusTokenService {
  constructor() {
    // Create a new instance of MockHttpService
    const mockHttpService = new MockHttpService() as any; // Cast as any to avoid type errors
    // Call the parent constructor with the mock HttpService
    super(mockHttpService);
  }
}
