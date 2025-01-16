import { IsUUID } from 'class-validator';

export class MovieParamDTO {
  @IsUUID()
  movieId: string;
}
