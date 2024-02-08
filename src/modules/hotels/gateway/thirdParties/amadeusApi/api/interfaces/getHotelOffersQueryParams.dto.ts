export interface GetHotelOffersQueryParams {
  hotelIds: string[];
  checkIn: Date;
  checkOut: Date;
  rooms: number;
  adults: number;
  children: number;
}
