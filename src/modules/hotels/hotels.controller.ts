import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GetHotelsQueryParamsDto } from './dto/getHotels.dto';

@Controller('hotels')
export class HotelsController {
  @Get() // GET /hotels?checkIn=&checkOut=&destiniation=&rooms=&adults=&children=
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  findAll(@Query() dto: GetHotelsQueryParamsDto) {
    return dto;
  }
}
