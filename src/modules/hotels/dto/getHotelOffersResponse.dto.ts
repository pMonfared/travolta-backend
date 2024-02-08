export class GetHotelOffersResponseDto {
  readonly hotelId: string;
  readonly hotel: object;
  readonly available: boolean;
  readonly offers: [];

  constructor(hotelId: string, hotel: object, available: boolean, offers: []) {
    this.hotelId = hotelId;
    this.hotel = hotel;
    this.available = available;
    this.offers = offers;
  }
}
