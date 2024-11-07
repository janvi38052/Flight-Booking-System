import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Passenger } from './passengers.entity';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
  ) {}

  async create(createPassengerDto: CreatePassengerDto): Promise<Passenger> {
    const passenger = this.passengerRepository.create(createPassengerDto);
    return this.passengerRepository.save(passenger);
  }

  async update(id: number, updatePassengerDto: UpdatePassengerDto): Promise<Passenger> {
    const passenger = await this.passengerRepository.findOne({ where: { passengerId: id } });
    if (!passenger) {
      throw new NotFoundException(`Passenger with ID ${id} not found`);
    }
    Object.assign(passenger, updatePassengerDto);
    return this.passengerRepository.save(passenger);
  }

  async findOne(id: number): Promise<Passenger> {
    return this.passengerRepository.findOne({ where: { passengerId: id } });
  }

  async findAll(): Promise<Passenger[]> {
    return this.passengerRepository.find();
  }

  async remove(id: number): Promise<void> {
    const passenger = await this.passengerRepository.findOne({ where: { passengerId: id } });
    if (!passenger) {
      throw new NotFoundException(`Passenger with ID ${id} not found`);
    }
    await this.passengerRepository.remove(passenger);
  }
}
