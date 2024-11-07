import { IsNotEmpty, IsDateString, IsString, IsInt } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsString()
  seatNumber: string;

  @IsNotEmpty()
  @IsDateString()
  bookingDate: string;

  @IsNotEmpty()
  @IsInt()
  passengerId: number;

  @IsNotEmpty()
  @IsInt()
  flightId: number;
}
