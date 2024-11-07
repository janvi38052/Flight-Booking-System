import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from 'src/bookings/bookings.entity';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  passengerId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => Booking, (booking) => booking.passenger)
  bookings: Booking[];
}
