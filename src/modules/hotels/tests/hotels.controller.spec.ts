import { Test, TestingModule } from '@nestjs/testing';
import { HotelsController } from '../hotels.controller';
import { HotelsService } from '../hotels.service';
import { mockAmadeusGateway } from './mocks/mockAmadeusGateway';

import { HttpService } from '@nestjs/axios';
import { AmadeusGateway } from '../gateway/thirdParties/amadeusApi/amadeus.gateway';
import {
  MockAmadeusTokenService,
  MockHttpService,
} from '../gateway/thirdParties/amadeusApi/tests/mocks/mockAmadeusTokenService';
import { AmadeusTokenService } from '../gateway/thirdParties/amadeusApi/api/amadeusToken.service';

describe('HotelsController', () => {
  let controller: HotelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelsController],
      providers: [
        HotelsService,
        { provide: AmadeusGateway, useValue: mockAmadeusGateway },
        { provide: AmadeusTokenService, useValue: MockAmadeusTokenService },
        { provide: HttpService, useValue: MockHttpService },
      ],
    }).compile();

    controller = module.get<HotelsController>(HotelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
