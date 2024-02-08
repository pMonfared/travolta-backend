import { GetHotelResponseDto } from '../dto/getHotelResponse.dto';
import { GetHotelsQueryParamsDto } from '../dto/getHotelsQueryParams.dto';

export abstract class HotelsGateway {
  abstract getHotels(
    params: GetHotelsQueryParamsDto,
  ): Promise<GetHotelResponseDto[]>;
}

export enum HOTEL_GATEWAY_METHOD {
  INTERNAL_GATEWAY = 'internal_gateway',
  AMADEUSE_API_GATEWAY = 'amadeuse_api_gateway',
  BOOKING_API_GATEWAY = 'booking_api_gateway',

  INVALID_METHOD = 'invalid',
}
