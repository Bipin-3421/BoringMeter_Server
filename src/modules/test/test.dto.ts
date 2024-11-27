import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
