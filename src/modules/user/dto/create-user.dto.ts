import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Role } from 'common/enum/role.enum';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;
}
