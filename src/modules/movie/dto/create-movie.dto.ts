import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateMovieDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @ApiProperty({
    description: 'image of the movie',
    type: 'string',
    format: 'binary',
  })
  image: Express.Multer.File;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  metaScore: number;
}

export class CreateReviewDTO {
  @IsUUID()
  movieId: string;

  @IsUUID()
  userId: string;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  score: number;
}
