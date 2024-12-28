import { Body, Controller, Get, Post } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Ctx } from 'common/decorator/ctx.decorator';
import { RequestContext } from 'common/request.context';
import { CreateWishlistDTO } from './dto/create-wishlist.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'common/decorator/public.decorator';

@Controller('wishlist')
@ApiTags('Wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  @Public()
  async create(@Ctx() ctx: RequestContext, @Body() body: CreateWishlistDTO) {
    const wishlist = await this.wishlistService.create(ctx, body);

    return {
      message: 'Wishlist created successfully',
      wishlist,
    };
  }
}
