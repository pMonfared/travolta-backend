import { HotelAddressDto } from '../dto/hotelAddress.dto';
import { HotelDistanceDto } from '../dto/hotelDistance.dto';

export class HotelModel {
  private _availablity: boolean = false;
  private _offers: Array<any> = [];

  readonly name: string;
  readonly hotelId: string;
  readonly address: HotelAddressDto;
  readonly distance: HotelDistanceDto;

  get availabilty(): boolean {
    return this._availablity;
  }

  get offers(): Array<any> {
    return this._offers;
  }

  constructor(
    name: string,
    hotelId: string,
    address: HotelAddressDto,
    distance: HotelDistanceDto,
  ) {
    this.name = name;
    this.hotelId = hotelId;
    this.address = address;
    this.distance = distance;
  }

  updateAvailabilty(isAvailable: boolean) {
    this._availablity = isAvailable;
  }

  updateOffers(offers: []) {
    this._offers = offers;
  }
}
