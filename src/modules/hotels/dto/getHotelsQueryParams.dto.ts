import { IsNumber, IsDate, IsNotEmpty } from 'class-validator'; // 'class'

export class GetHotelsQueryParamsDto {
  @IsDate()
  checkIn: Date;
  @IsDate()
  checkOut: Date;
  @IsNotEmpty()
  destination: string;
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
  @IsNumber()
  rooms: number;
  @IsNumber()
  adults: number;
  @IsNumber()
  children: number;
}
