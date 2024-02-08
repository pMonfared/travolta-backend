import { GetHotelResponseDto } from '../dto/getHotelResponse.dto';
import { GetHotelsQueryParamsDto } from '../dto/getHotelsQueryParams.dto';

export abstract class HotelsGateway {
  abstract getHotels(
    params: GetHotelsQueryParamsDto,
  ): Promise<GetHotelResponseDto[]>;
}

export enum HOTEL_GATEWAY_METHOD {
  INTERNAL_GATEWAY = 'internal_gateway',
  AMADEUSE_DOT_COM_GATEWAY = 'amadeuse_gateway',
  BOOKING_DOT_COM_GATEWAY = 'booking_dot_com_gateway',
}
