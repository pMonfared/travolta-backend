export class getHotelsResponseMock {}
export class getHotelOffersResponseMock {}

export const mockAmadeusGateway = {
  getHotels: jest.fn().mockResolvedValue(getHotelsResponseMock),
  getHotelOffers: jest.fn().mockResolvedValue(getHotelOffersResponseMock),
};
