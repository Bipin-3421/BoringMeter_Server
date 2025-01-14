import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString({ message: 'name should be a string' })
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @IsEmail({}, { message: 'email must be an email' })
  email: string;

  @IsString({ message: 'password should be a string' })
  @IsNotEmpty({ message: 'password should not be empty' })
  password: string;

  @IsString({ message: 'phoneNumber should be a string' })
  @IsNotEmpty({ message: 'phoneNumber should not be empty' })
  phoneNumber: string;
}
