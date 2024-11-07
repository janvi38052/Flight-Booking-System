import { IsNumber, IsOptional, IsDate, IsString } from 'class-validator';

export class UpdateBookingDto {
  @IsOptional()
  @IsNumber()
  flightId?: number;

  @IsOptional()
  @IsNumber()
  passengerId?: number;

  @IsOptional()
  @IsString()
  seatNumber?: string;

  @IsOptional()
  @IsDate()
  bookingDate?: Date;
}
