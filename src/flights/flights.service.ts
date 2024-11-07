import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './flights.entity';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<Flight> {
    const flight = this.flightRepository.create(createFlightDto);
    return this.flightRepository.save(flight);
  }

  async update(id: number, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { flightId: id } });
    if (!flight) {
      throw new HttpException('Flight not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(flight, updateFlightDto);
    return this.flightRepository.save(flight);
  }

  async findOne(id: number): Promise<Flight> {
    const flight = await this.flightRepository.findOne({ where: { flightId: id } });
    if (!flight) {
      throw new HttpException('Flight not found', HttpStatus.NOT_FOUND);
    }
    return flight;
  }

  async findAll(): Promise<Flight[]> {
    return this.flightRepository.find();
  }

  async remove(id: number): Promise<void> {
    const flight = await this.flightRepository.findOne({ where: { flightId: id } });
    if (!flight) {
      throw new HttpException('Flight not found', HttpStatus.NOT_FOUND);
    }
    await this.flightRepository.remove(flight);
  }
}
