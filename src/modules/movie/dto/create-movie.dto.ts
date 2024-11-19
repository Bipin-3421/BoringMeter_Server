import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'image of the movie',
    type: 'string',
    format: 'binary',
  })
  image: Express.Multer.File;
}
