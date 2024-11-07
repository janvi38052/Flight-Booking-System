import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateFlightDto {
  @IsOptional()
  @IsString()
  flightNumber?: string;

  @IsOptional()
  @IsDate()
  departureTime?: Date;

  @IsOptional()
  @IsDate()
  arrivalTime?: Date;

  
}
