import { Injectable } from '@nestjs/common';
import { RequestContext } from 'common/request.context';
import { CreateWishlistDTO } from './dto/create-wishlist.dto';
import { TransactionalConnection } from 'modules/connecion/connection.service';
import { Wishlist } from 'common/entities/whishlist.entity';

@Injectable()
export class WishlistService {
  constructor(private readonly connection: TransactionalConnection) {}
  async create(ctx: RequestContext, details: CreateWishlistDTO) {
    const wishlistRepo = this.connection.getRepository(ctx, Wishlist);

    const wishlist = new Wishlist({
      userId: details.userId,
      movieId: details.movieId,
    });

    return await wishlistRepo.save(wishlist);
  }

  async findMany(ctx: RequestContext, userId: string): Promise<Wishlist[]> {
    const wishlistRepo = this.connection.getRepository(ctx, Wishlist);

    const findOptions = await wishlistRepo.find({
      where: {
        userId,
      },
      relations: { movie: { image: true } },
    });

    return findOptions;
  }
}
