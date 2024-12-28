import { IsEmail, IsString } from 'class-validator';

export class LoginUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;
}
