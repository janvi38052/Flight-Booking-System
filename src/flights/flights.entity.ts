import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from 'src/bookings/bookings.entity';

@Entity()
export class Flight {
  @PrimaryGeneratedColumn()
  flightId: number;

  @Column()
  flightNumber: string;

  @Column()
  departureTime: Date;

  @Column()
  arrivalTime: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Booking, (booking) => booking.flight)
  bookings: Booking[];
}
