import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  NotAcceptableException,
  Get,
  Delete,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { RequestContext } from '@common/request.context';
import { Ctx } from '@common/decorator/ctx.decorator';
import { CreateMovieDTO, CreateReviewDTO } from './dto/create-movie.dto';
import { FileUpload } from '@common/file-upload.interceptor';
import { Require } from '@common/decorator/require.decorator';
import { PermissionAction, PermissionResource } from 'types/permission';
import { MovieParamDTO } from './dto/param.dto';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @Require({
    permission: PermissionResource.MOVIE,
    action: PermissionAction.Edit,
  })
  @UseInterceptors(FileUpload('image'))
  @ApiConsumes('multipart/form-data')
  async createMovie(
    @Ctx() ctx: RequestContext,
    @Body() body: CreateMovieDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file || file.size === 0) {
      throw new NotAcceptableException('Image is required');
    }

    body.image = file;
    const userId = String(ctx.data?.userId);

    console.log(userId);

    const data = await this.movieService.create(ctx, body, userId);

    return {
      message: 'Movie created Successfully',
      data,
    };
  }

  @Get()
  @Require({
    permission: PermissionResource.MOVIE,
    action: PermissionAction.Edit,
  })
  async getAllMovies(@Ctx() ctx: RequestContext) {
    const movies = await this.movieService.findMany(ctx);

    return {
      data: movies.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          image: movie.image,
          description: movie.description,
          metaScore: movie.metaScore,
          userScore: movie.userScore,
          user: movie.user,
        };
      }),
    };
    ``;
  }

  // @Post('review')
  // @Require({
  //   permission: PermissionResource.MOVIE,
  //   action: PermissionAction.Edit,
  // })
  // async createReview(
  //   @Ctx() ctx: RequestContext,
  //   @Body() body: CreateReviewDTO,
  // ) {
  //   const review = await this.movieService.addReview(ctx, body);
  //   return {
  //     data: review,
  //   };
  // }

  // @Post('review')
  // @Require({
  //   permission: PermissionResource.MOVIE,
  //   action: PermissionAction.Edit,
  // })
  // async createReview(
  //   @Ctx() ctx: RequestContext,
  //   @Body() body: CreateReviewDTO,
  // ) {
  //   const review = await this.movieService.addReview(ctx, body);
  //   return {
  //     data: review,
  //   };
  // }

  @Delete(':movieId')
  @Require({
    permission: PermissionResource.MOVIE,
    action: PermissionAction.Edit,
  })
  async deleteMovie(@Ctx() ctx: RequestContext, @Query() param: MovieParamDTO) {
    const movie = await this.movieService.delete(ctx, param.movieId);

    return {
      message: 'Movie deleted successfully',
    };
  }
}
