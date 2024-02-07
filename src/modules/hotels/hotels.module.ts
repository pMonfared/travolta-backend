import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { HttpModule } from '@nestjs/axios';
import { AmadeusService } from './amadeus.service';
import { AmadeusTokenService } from './amadeusToken.service';

@Module({
  imports: [HttpModule],
  controllers: [HotelsController],
  providers: [HotelsService, AmadeusService, AmadeusTokenService],
})
export class HotelsModule {}
