import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { HttpModule } from '@nestjs/axios';
import { AmadeusApi } from './gateway/thirdParties/amadeusApi/api/amadeus.api';
import { AmadeusGateway } from './gateway/thirdParties/amadeusApi/amadeus.gateway';
import { AmadeusTokenService } from './gateway/thirdParties/amadeusApi/api/amadeusToken.service';

@Module({
  // Import HttpModule for making HTTP requests
  imports: [HttpModule],
  // Declare HotelsController as a controller for this module
  controllers: [HotelsController],
  // Declare HotelsService, AmadeusGateway, and AmadeusTokenService as providers for dependency injection
  providers: [HotelsService, AmadeusApi, AmadeusGateway, AmadeusTokenService],
})
export class HotelsModule {}
