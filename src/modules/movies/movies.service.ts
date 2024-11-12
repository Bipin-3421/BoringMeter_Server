import { Injectable } from '@nestjs/common';
import { RequestContext } from 'src/common/request.context';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { TransactionalConnection } from '../connecion/connection.service';
import { Movies } from 'src/common/entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly connection: TransactionalConnection) {}
  async create(ctx: RequestContext, body: CreateMovieDTO) {
    const movieRepo = this.connection.getRepository(Movies);

    const movie = new Movies({
      title: body.title,
      description: body.description,
      image: body.image,
    });

    return await movieRepo.save(movie);
  }
}
