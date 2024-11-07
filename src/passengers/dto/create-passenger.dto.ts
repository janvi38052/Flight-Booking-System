import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreatePassengerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;
}
