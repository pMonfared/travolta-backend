import { HotelModel } from '../models/hotel.model';
import { HotelAddressDto } from './hotelAddress.dto';
import { HotelDistanceDto } from './hotelDistance.dto';

export class GetHotelResponseDto {
  readonly name: string;
  readonly hotelId: string;
  readonly address: HotelAddressDto;
  readonly distance: HotelDistanceDto;
  readonly availablity: boolean = false;
  readonly offers: Array<any> = [];

  constructor(hotelModel: HotelModel) {
    this.name = hotelModel.name;
    this.hotelId = hotelModel.hotelId;
    this.address = hotelModel.address;
    this.distance = hotelModel.distance;
    this.availablity = hotelModel.availabilty;
    this.offers = hotelModel.offers;
  }
}
