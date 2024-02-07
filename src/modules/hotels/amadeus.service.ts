import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AmadeusTokenService } from './amadeusToken.service';
import { GetHotelResponseDto } from './dto/getHotelResponse.dto';
import { GetHotelsQueryParamsDto } from './dto/getHotelsQueryParams.dto';
// import { AxiosResponse } from 'axios';

@Injectable()
export class AmadeusService {
  constructor(
    private readonly http: HttpService,
    private readonly amadeusTokenService: AmadeusTokenService,
  ) {}

  async getHotels(
    params: GetHotelsQueryParamsDto,
  ): Promise<GetHotelResponseDto[]> {
    try {
      const accessToken = await this.amadeusTokenService.getAccessToken();
      const res = await this.http.axiosRef.get(
        // process.env.AMADEUS_SEARCH_HOTELS_BY_GEOCODE_URI,
        `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${params.latitude}&longitude=${params.longitude}&radius=5&radiusUnit=KM&hotelSource=ALL`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      return res.data.data;
    } catch (err) {}
  }
}
