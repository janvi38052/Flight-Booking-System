import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Flight } from 'src/flights/flights.entity';
import { Passenger } from 'src/passengers/passengers.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @ManyToOne(() => Flight, (flight) => flight.bookings)
  flight: Flight;

  @ManyToOne(() => Passenger, (passenger) => passenger.bookings)
  passenger: Passenger;

  @Column()
  seatNumber: string;

  @Column()
  bookingDate: Date;
}
