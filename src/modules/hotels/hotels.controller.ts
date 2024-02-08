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
import { AmadeusGateway } from './gateway/thirdParties/amadeus/amadeus.gateway';
import { HttpService } from '@nestjs/axios';
import { AmadeusTokenService } from './gateway/thirdParties/amadeus/amadeusToken.service';

@Controller('hotels')
export class HotelsController {
  private readonly hotel_gateway_method: HOTEL_GATEWAY_METHOD =
    HOTEL_GATEWAY_METHOD.AMADEUSE_DOT_COM_GATEWAY;
  constructor(
    private readonly hotelsService: HotelsService,
    private readonly http: HttpService,
    private readonly amadeusTokenService: AmadeusTokenService,
  ) {
    this.hotelsService.registerHotelsGateway(
      this.hotel_gateway_method,
      new AmadeusGateway(this.http, this.amadeusTokenService),
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

    return hotels;
  }
}
