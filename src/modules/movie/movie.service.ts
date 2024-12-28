import { Injectable } from '@nestjs/common';
import { RequestContext } from 'common/request.context';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { TransactionalConnection } from '../connecion/connection.service';
import { Movie } from 'common/entities/movie.entity';
import { AssetService } from '../asset/asset.service';
import { AssetFor } from 'common/enum/asset.enum';
import { DataSource } from 'typeorm';

@Injectable()
export class MovieService {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly assetService: AssetService,
    private readonly dataSource: DataSource,
  ) {}
  async create(ctx: RequestContext, body: CreateMovieDTO) {
    const movieRepo = this.dataSource.getRepository(Movie);

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

    return await movieRepo.save(movie);
  }
}
