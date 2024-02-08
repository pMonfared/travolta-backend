import { Injectable } from '@nestjs/common';
import { HOTEL_GATEWAY_METHOD, HotelsGateway } from './gateway/hotels.gateway';
import { GetHotelsQueryParamsDto } from './dto/getHotelsQueryParams.dto';
import { GetHotelResponseDto } from './dto/getHotelResponse.dto';

@Injectable()
export class HotelsService {
  private hotelsGateways: Record<string, HotelsGateway> = {};

  public registerHotelsGateway(
    hotelMethod: HOTEL_GATEWAY_METHOD,
    gateway: HotelsGateway,
  ) {
    this.hotelsGateways[hotelMethod] = gateway;
  }

  async getHotels(
    params: GetHotelsQueryParamsDto,
    hotelMethod: HOTEL_GATEWAY_METHOD,
  ): Promise<GetHotelResponseDto[]> {
    const gateway = this.hotelsGateways[hotelMethod];

    if (gateway) {
      return await gateway.getHotels(params);
    } else {
      throw new Error('Unsupported hotel gatway method');
    }
  }
}
