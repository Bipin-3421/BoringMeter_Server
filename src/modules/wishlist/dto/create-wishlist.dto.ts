import { IsUUID } from 'class-validator';

export class CreateWishlistDTO {
  @IsUUID()
  userId: string;

  @IsUUID()
  movieId: string;
}
