import { Controller, Get, Post, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { ApiTags } from '@nestjs/swagger';
import { RequestContext } from 'src/common/request.context';
import { Ctx } from 'src/common/decorator/ctx.decorator';
import { CreateMovieDTO } from './dto/create-movie.dto';

@Controller('movies')
@ApiTags('Movie')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Post()
  async createMovie(@Ctx() ctx: RequestContext, @Body() body: CreateMovieDTO) {
    const data = await this.movieService.create(ctx, body);
    return {
      message: 'Movie created Successfully',
      data,
    };
  }
}
