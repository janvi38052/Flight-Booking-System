import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class UpdatePassengerDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
