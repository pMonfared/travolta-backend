import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { AmadeusTokenService } from './amadeusToken.service';
import { GetHotelListByGeoCodeParams } from './interfaces/getHotelListByGeoCodeParams.interface';
import { HotelModel } from 'src/modules/hotels/models/hotel.model';
import { GetHotelOffersQueryParams } from './interfaces/getHotelOffersQueryParams.dto';
import { GetHotelOffersResponseDto } from 'src/modules/hotels/dto/getHotelOffersResponse.dto';

@Injectable()
export class AmadeusApi {
  constructor(
    private readonly http: HttpService,
    private readonly amadeusTokenService: AmadeusTokenService,
  ) {}

  // Method to fetch hotels based on geographic coordinates
  async getHotelListByGeoCode(
    params: GetHotelListByGeoCodeParams,
  ): Promise<HotelModel[]> {
    try {
      // Retrieve access token
      const accessToken = await this.amadeusTokenService.getAccessToken();
      // Make request to Amadeus API for hotel data
      const res = await this.http.axiosRef.get(
        `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${params.latitude}&longitude=${params.longitude}&radius=5&radiusUnit=KM&hotelSource=ALL`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      // Map response data to DTO
      const hotelsDto = res.data?.data?.map(
        (p: any) => new HotelModel(p.name, p.hotelId, p.address, p.distance),
      );
      return hotelsDto;
    } catch (err) {
      // Handle errors
      throw new Error(
        err?.message + ': ' + JSON.stringify(err?.response?.data),
      );
    }
  }
  // Method to fetch hotel offers based on query parameters
  async getHotelOffers(
    params: GetHotelOffersQueryParams,
  ): Promise<GetHotelOffersResponseDto[]> {
    try {
      // Retrieve access token
      const accessToken = await this.amadeusTokenService.getAccessToken();
      // Format check-in and check-out dates
      const checkInString = moment(params.checkIn).format('YYYY-MM-DD');
      const checkOutString = moment(params.checkOut).format('YYYY-MM-DD');
      // Construct URL for fetching hotel offers
      const url = `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=BWBWE450,BWBWE450&checkInDate=${checkInString}&checkOutDate=${checkOutString}&roomQuantity=${params.rooms}&paymentPolicy=NONE&bestRateOnly=true`;
      // Make request to Amadeus API for hotel offers
      const res = await this.http.axiosRef.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // Map response data to DTO

      const hotelOffersDto = res.data?.data?.map((p: any) => {
        return new GetHotelOffersResponseDto(
          p.hotel.hotelId,
          p.hotel,
          p.available,
          p.offers,
        );
      });

      return hotelOffersDto;
    } catch (err) {
      // Handle errors
      throw new Error(
        err?.message + ': ' + JSON.stringify(err?.response?.data),
      );
    }
  }
}
