import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flights.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Flight])],
  providers: [FlightsService],
  controllers:[FlightsController],
  exports:[FlightsService]
})
export class FlightsModule {}
