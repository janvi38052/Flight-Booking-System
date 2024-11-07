import { Controller, Post, Get, Patch, Param, Body, Delete, Put } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Flight } from './flights.entity';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightService: FlightsService) {}

  // Create a new flight
  @Post()
  create(@Body() createFlightDto: CreateFlightDto): Promise<Flight> {
    return this.flightService.create(createFlightDto);
  }

  // Update flight details by id
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<Flight> {
    return this.flightService.update(id, updateFlightDto);
  }

  // Find a single flight by id
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Flight> {
    return this.flightService.findOne(id);
  }

  // Find all flights
  @Get()
  findAll(): Promise<Flight[]> {
    return this.flightService.findAll();
  }

  // Delete a flight by id
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.flightService.remove(id);
  }
}
