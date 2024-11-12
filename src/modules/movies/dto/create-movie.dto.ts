import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
