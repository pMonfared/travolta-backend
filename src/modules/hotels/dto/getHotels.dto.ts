import { IsNumber, IsDate, IsNotEmpty } from 'class-validator'; // 'class'

export class GetHotelsQueryParamsDto {
  @IsDate()
  checkIn: Date;
  @IsDate()
  checkOut: Date;
  @IsNotEmpty()
  destination: string;
  @IsNumber()
  rooms: number;
  @IsNumber()
  adults: number;
  @IsNumber()
  children: number;
}
