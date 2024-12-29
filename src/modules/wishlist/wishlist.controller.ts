import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { Ctx } from 'common/decorator/ctx.decorator';
import { RequestContext } from 'common/request.context';
import { CreateWishlistDTO } from './dto/create-wishlist.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'common/decorator/public.decorator';
import { Require } from 'common/decorator/require.decorator';
import { PermissionAction, PermissionResource } from 'types/permission';

@Controller('wishlist')
@ApiTags('Wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  async create(@Ctx() ctx: RequestContext, @Body() body: CreateWishlistDTO) {
    const wishlist = await this.wishlistService.create(ctx, body);

    return {
      message: 'Wishlist created successfully',
      wishlist,
    };
  }

  @Get()
  @Require({
    permission: PermissionResource.WISHLIST,
    action: PermissionAction.Edit,
  })
  async getWishlist(@Ctx() ctx: RequestContext, @Req() req: RequestContext) {
    const userId = req.data?.userId;
    const wishlist = await this.wishlistService.findMany(ctx, userId as string);

    return {
      data: wishlist.map((wishlist) => {
        return {
          id: wishlist.id,
          movie: wishlist.movie,
        };
      }),
    };
  }
}
