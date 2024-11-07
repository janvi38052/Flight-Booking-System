import { IsString, IsDate } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  flightNumber: string;

  @IsDate()
  departureTime: Date;

  @IsDate()
  arrivalTime: Date;
  
}
