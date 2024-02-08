import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetHotelsQueryParamsDto } from './dto/getHotelsQueryParams.dto';
import { Throttle } from '@nestjs/throttler';
import { HotelsService } from './hotels.service';
import { HOTEL_GATEWAY_METHOD } from './gateway/hotels.gateway';
import { AmadeusGateway } from './gateway/thirdParties/amadeusApi/amadeus.gateway';
import { AmadeusApi } from './gateway/thirdParties/amadeusApi/api/amadeus.api';

@Controller('hotels')
export class HotelsController {
  private readonly hotel_gateway_method: HOTEL_GATEWAY_METHOD =
    HOTEL_GATEWAY_METHOD.AMADEUSE_API_GATEWAY;
  constructor(
    private readonly hotelsService: HotelsService,
    private readonly amadeusApi: AmadeusApi,
  ) {
    this.hotelsService.registerHotelsGateway(
      this.hotel_gateway_method,
      new AmadeusGateway(this.amadeusApi),
    );
  }
  // Override default configuration for Rate limiting and duration.
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Get() // GET /v1/hotels?checkIn=&checkOut=&destiniation=&rooms=&adults=&children=
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async findAll(@Query() dto: GetHotelsQueryParamsDto) {
    const hotels = await this.hotelsService.getHotels(
      dto,
      this.hotel_gateway_method,
    );

    console.log('hotels', hotels);

    return hotels;
  }
}
