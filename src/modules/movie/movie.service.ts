import { Injectable } from '@nestjs/common';
import { RequestContext } from 'common/request.context';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { TransactionalConnection } from '../connecion/connection.service';
import { Movie } from 'common/entities/movie.entity';
import { AssetService } from '../asset/asset.service';
import { AssetFor } from 'common/enum/asset.enum';

@Injectable()
export class MovieService {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly assetService: AssetService,
  ) {}
  async create(ctx: RequestContext, body: CreateMovieDTO) {
    const movieRepo = this.connection.getRepository(ctx, Movie);

    const asset = await this.assetService.upload(
      ctx,
      body.image.buffer,
      AssetFor.MOVIE,
    );

    const movie = new Movie({
      title: body.title,
      description: body.description,
      imageId: asset.id,
    });

    await movieRepo.save(movie);

    return movie;
  }
}
