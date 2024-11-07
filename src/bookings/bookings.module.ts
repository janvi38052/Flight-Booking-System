import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './bookings.entity';
import { PassengersService } from 'src/passengers/passengers.service';
import { FlightsService } from 'src/flights/flights.service';
import { Passenger } from 'src/passengers/passengers.entity';
import { Flight } from 'src/flights/flights.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Booking,Passenger,Flight])],
  providers: [BookingsService,PassengersService,FlightsService],
  controllers: [BookingsController],
  exports:[BookingsService]
})
export class BookingsModule {}
