// import { GetHotelOffersResponseDto } from './getHotelOffersResponse.dto';

export class GetHotelResponseDto {
  readonly name: string;
  readonly hotelId: string;
  readonly address: HotelAddress;
  readonly distance: HotelDistance;

  constructor(
    name: string,
    hotelId: string,
    address: HotelAddress,
    distance: HotelDistance,
  ) {
    this.name = name;
    this.hotelId = hotelId;
    this.address = address;
    this.distance = distance;
  }
}

class HotelAddress {
  countryCode: string;
}

class HotelDistance {
  value: number;
  unit: string;
}
