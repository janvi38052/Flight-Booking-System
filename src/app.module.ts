import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { PassengersModule } from './passengers/passengers.module';
import { BookingsModule } from './bookings/bookings.module';
import { Flight } from './flights/flights.entity';
import { Passenger } from './passengers/passengers.entity';
import { Booking } from './bookings/bookings.entity';

@Module({
  imports:  [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'api',
      entities: [Flight,Passenger,Booking],
      synchronize: true,
    }),
     FlightsModule,
     PassengersModule,
     BookingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
