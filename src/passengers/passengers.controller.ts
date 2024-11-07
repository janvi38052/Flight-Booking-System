import { Controller, Post, Get, Patch, Param, Body, Put, Delete } from '@nestjs/common';
import { PassengersService } from './passengers.service';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import { Passenger } from './passengers.entity';

@Controller('passengers')
export class PassengersController {
  constructor(private readonly passengerService: PassengersService) {}

  @Post()
  create(@Body() createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    return this.passengerService.create(createPassengerDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ): Promise<Passenger> {
    return this.passengerService.update(id, updatePassengerDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Passenger> {
    return this.passengerService.findOne(id);
  }

  @Get()
  findAll(): Promise<Passenger[]> {
    return this.passengerService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.passengerService.remove(id);
  }
}
