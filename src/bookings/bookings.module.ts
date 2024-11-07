import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { Flight } from 'src/flights/flights.entity';
import { Passenger } from 'src/passengers/passengers.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Booking,Flight,Passenger])],
  providers: [BookingsService],
  controllers: [BookingsController],
  exports:[BookingsService]
})
export class BookingsModule {}
