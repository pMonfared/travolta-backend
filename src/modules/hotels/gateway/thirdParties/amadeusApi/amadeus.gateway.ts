import { Injectable } from '@nestjs/common';
import { GetHotelsQueryParamsDto } from '../../../dto/getHotelsQueryParams.dto';
import { HotelsGateway } from '../../hotels.gateway';
import { AmadeusApi } from './api/amadeus.api';
import { GetHotelResponseDto } from 'src/modules/hotels/dto/getHotelResponse.dto';

@Injectable()
export class AmadeusGateway implements HotelsGateway {
  constructor(private readonly amadeusApi: AmadeusApi) {}

  // Method to fetch hotels based on geographic coordinates
  async getHotels(
    params: GetHotelsQueryParamsDto,
  ): Promise<GetHotelResponseDto[]> {
    try {
      const hotels = await this.amadeusApi.getHotelListByGeoCode({
        latitude: params.latitude,
        longitude: params.longitude,
      });

      // const hotelsIds = hotels.map((p) => p.hotelId);

      const hotelList: GetHotelResponseDto[] = [];

      for (let i = 0; i < hotels.length; i++) {
        const hotel = hotels[i];

        try {
          const hotelsOffers = await this.amadeusApi.getHotelOffers({
            adults: params.adults,
            checkIn: params.checkIn,
            checkOut: params.checkOut,
            hotelIds: [hotel.hotelId],
            rooms: params.rooms,
            children: params.children,
          });

          const hotelOffer = hotelsOffers.find(
            (item) => item.hotelId === hotel.hotelId,
          );
          if (hotelOffer) {
            hotel.updateOffers(hotelOffer.offers);
            hotel.updateAvailabilty(hotelOffer.available);
          }
        } catch (error) {
          console.log(error);
        }

        hotelList.push(new GetHotelResponseDto(hotel));
      }

      return hotelList;
    } catch (err) {
      // Handle errors
      throw new Error(
        err?.message + ': ' + JSON.stringify(err?.response?.data),
      );
    }
  }
}
