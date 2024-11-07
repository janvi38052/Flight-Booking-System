import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './bookings.entity';
import { applyFilters } from 'src/shared/filter';
import { applySorting } from 'src/shared/sorting';
import { applyPagination } from 'src/shared/pagination';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { LoggerService } from 'src/utils/logger.service';
import { SuccessMessages } from 'src/utils/messages';
import { ErrorCodes } from 'src/utils/error-code';

// Inject the services instead of repositories
import { PassengersService } from 'src/passengers/passengers.service';
import { FlightsService } from 'src/flights/flights.service';

@Injectable()
export class BookingsService {
  private readonly logger = new LoggerService();

  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,

    // Inject services instead of repositories
    private readonly passengerService: PassengersService,
    private readonly flightService: FlightsService,
  ) {}

  async findAll(params: {
    filters?: { [key: string]: any };
    sortBy?: string;
    order?: 'ASC' | 'DESC';
    page?: number;
    pageSize?: number;
  }): Promise<Booking[]> {
    let query = this.bookingRepository.createQueryBuilder('booking');

    if (params.filters) {
      query = applyFilters(query, params.filters);
    }

    if (params.sortBy) {
      query = applySorting(query, params.sortBy, params.order);
    }

    if (params.page || params.pageSize) {
      query = applyPagination(query, params.page, params.pageSize);
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { bookingId: id },
      relations: ['flight', 'passenger'], // Relations are handled by services now
    });

    if (!booking) {
      this.logger.error(`Booking with id ${id} not found`, 'BookingsService');
      throw new NotFoundException({
        message: ErrorCodes.BOOKING_NOT_FOUND,
        errorCode: ErrorCodes.BOOKING_NOT_FOUND,
      });
    }

    // Fetch related passenger and flight data using their respective services
    const passenger = await this.passengerService.findOne(booking.passenger.passengerId);
    const flight = await this.flightService.findOne(booking.flight.flightId);

    // Adding the related data to the booking object
    booking.passenger = passenger;
    booking.flight = flight;

    return booking;
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    try {
      const newBooking = this.bookingRepository.create(createBookingDto);

      // Use services to fetch passenger and flight entities
      const passenger = await this.passengerService.findOne(createBookingDto.passengerId);
      const flight = await this.flightService.findOne(createBookingDto.flightId);

      newBooking.passenger = passenger;
      newBooking.flight = flight;

      const booking = await this.bookingRepository.save(newBooking);

      this.logger.log(SuccessMessages.BOOKING_CREATED_SUCCESSFULLY, 'BookingsService'); // Use SuccessMessages

      return booking;
    } catch (error) {
      this.logger.error('Error while creating booking', 'BookingsService');
      throw new BadRequestException({
        message: ErrorCodes.INVALID_BOOKING_DATA,
        errorCode: ErrorCodes.INVALID_BOOKING_DATA,
      });
    }
  }

  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { bookingId: id } });

    if (!booking) {
      this.logger.error(`Booking with id ${id} not found`, 'BookingsService');
      throw new NotFoundException({
        message: ErrorCodes.BOOKING_NOT_FOUND,
        errorCode: ErrorCodes.BOOKING_NOT_FOUND,
      });
    }

    Object.assign(booking, updateBookingDto);

    // Fetch related passenger and flight data using services
    if (updateBookingDto.passengerId) {
      booking.passenger = await this.passengerService.findOne(updateBookingDto.passengerId);
    }
    if (updateBookingDto.flightId) {
      booking.flight = await this.flightService.findOne(updateBookingDto.flightId);
    }

    await this.bookingRepository.save(booking);

    this.logger.log(SuccessMessages.BOOKING_UPDATED_SUCCESSFULLY, 'BookingsService');

    return booking;
  }

  async remove(id: number): Promise<void> {
    const booking = await this.bookingRepository.findOne({ where: { bookingId: id } });

    if (!booking) {
      this.logger.error(`Booking with id ${id} not found`, 'BookingsService');
      throw new NotFoundException({
        message: ErrorCodes.BOOKING_NOT_FOUND,
        errorCode: ErrorCodes.BOOKING_NOT_FOUND,
      });
    }

    await this.bookingRepository.remove(booking);
    this.logger.log(SuccessMessages.BOOKING_DELETED_SUCCESSFULLY, 'BookingsService');
  }
}
