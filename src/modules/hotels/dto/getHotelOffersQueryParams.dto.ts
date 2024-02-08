import { IsDate, IsNumber } from 'class-validator';

export class GetHotelOffersQueryParamsDto {
  hotelIds: string[];
  @IsDate()
  checkIn: Date;
  @IsDate()
  checkOut: Date;
  @IsNumber()
  rooms: number;
  @IsNumber()
  adults: number;
  @IsNumber()
  children: number;
}
