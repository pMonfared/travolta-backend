import { Test, TestingModule } from '@nestjs/testing';
import { HotelsService } from '../hotels.service';
import { mockAmadeusGateway } from './mocks/mockAmadeusGateway';
import { AmadeusGateway } from '../gateway/thirdParties/amadeusApi/amadeus.gateway';

describe('HotelsService', () => {
  let service: HotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelsService,
        { provide: AmadeusGateway, useValue: mockAmadeusGateway },
      ],
    }).compile();

    service = module.get<HotelsService>(HotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
