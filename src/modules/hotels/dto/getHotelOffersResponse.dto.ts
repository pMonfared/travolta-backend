export class GetHotelOffersResponseDto {
  readonly hotel: object;
  readonly available: boolean;
  readonly offers: [];

  constructor(hotel: object, available: boolean, offers: []) {
    this.hotel = hotel;
    this.available = available;
    this.offers = offers;
  }
}
