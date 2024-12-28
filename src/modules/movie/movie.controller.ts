import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  NotAcceptableException,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { RequestContext } from 'common/request.context';
import { Ctx } from 'common/decorator/ctx.decorator';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { FileUpload } from 'common/file-upload.interceptor';
import { Require } from 'common/decorator/require.decorator';
import { PermissionAction, PermissionResource } from 'types/permission';

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

    const data = await this.movieService.create(ctx, body);

    return {
      message: 'Movie created Successfully',
      data,
    };
  }
}
