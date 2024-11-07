import { Controller, Get, Post, Body, Param, Put, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './bookings.entity';
import { LoggerService } from 'src/utils/logger.service'; 
 

@Controller('bookings')
export class BookingsController {
  private readonly logger = new LoggerService();

  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1, 
    @Query('pageSize') pageSize: number = 10, 
    @Query('sortBy') sortBy: string = 'bookingId', 
    @Query('order') order: 'ASC' | 'DESC' = 'ASC', 
    @Query() filters?: { [key: string]: any }
  ): Promise<Booking[]> {
    
    return await this.bookingsService.findAll({
      filters,
      sortBy,
      order,
      page,
      pageSize,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Booking> {
    return await this.bookingsService.findOne(id);
  }

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return await this.bookingsService.create(createBookingDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBookingDto: UpdateBookingDto
  ): Promise<Booking> {
    return await this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.bookingsService.remove(id);
  }
}
