import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto'; 
import { Passenger } from 'src/passengers/passengers.entity';
import { Flight } from 'src/flights/flights.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,

    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,

    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { passengerId, flightId, seatNumber, bookingDate } = createBookingDto;

    const passenger = await this.passengerRepository.findOne({ where: { passengerId } });
    if (!passenger) {
      throw new NotFoundException('Passenger not found');
    }

    const flight = await this.flightRepository.findOne({ where: { flightId } });
    if (!flight) {
      throw new NotFoundException('Flight not found');
    }

    const booking = this.bookingRepository.create({
      seatNumber,
      bookingDate,
      passenger,
      flight,
    });

    return this.bookingRepository.save(booking);
  }


  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { bookingId: id },
      relations: ['flight', 'passenger'], 
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

 
  async findAll(): Promise<Booking[]> {
    return this.bookingRepository.find({
      relations: ['flight', 'passenger'], 
    });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { bookingId: id } }); 
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    const { seatNumber, bookingDate } = updateBookingDto;

    booking.seatNumber = seatNumber || booking.seatNumber;
    booking.bookingDate = bookingDate || booking.bookingDate;

    return this.bookingRepository.save(booking);
  }

  async remove(id: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({ where: { bookingId: id } }); 
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    await this.bookingRepository.remove(booking);
  }
}
