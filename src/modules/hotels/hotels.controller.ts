import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetHotelsQueryParamsDto } from './dto/getHotelsQueryParams.dto';
import { Throttle } from '@nestjs/throttler';
import { AmadeusService } from './amadeus.service';
import { Response } from 'express';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly amadeusService: AmadeusService) {}
  // Override default configuration for Rate limiting and duration.
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Get() // GET /v1/hotels?checkIn=&checkOut=&destiniation=&rooms=&adults=&children=
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async findAll(
    @Res({ passthrough: true }) res: Response,
    @Query() dto: GetHotelsQueryParamsDto,
  ) {
    const data = await this.amadeusService.getHotels(dto);

    return res.status(HttpStatus.OK).json(data);
  }
}

// async function wait(milliseconds: number): Promise<void> {
//   return new Promise((resolve) => setTimeout(resolve, milliseconds));
// }
