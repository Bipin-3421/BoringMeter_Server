import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestContext } from 'common/request.context';
import { CreateMovieDTO, CreateReviewDTO } from './dto/create-movie.dto';
import { TransactionalConnection } from '../connecion/connection.service';
import { Movie } from '@common/entities/movie.entity';
import { AssetService } from '../asset/asset.service';
import { AssetFor } from '@common/enum/asset.enum';

@Injectable()
export class MovieService {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly assetService: AssetService,
  ) {}

  async create(ctx: RequestContext, body: CreateMovieDTO, userId: string) {
    const movieRepo = this.connection.getRepository(ctx, Movie);

    const asset = await this.assetService.upload(
      ctx,
      body.image.buffer,
      AssetFor.MOVIE,
    );

    if (!asset || !asset.id) {
      throw new Error('Failed to create asset');
    }

    const movie = new Movie({
      title: body.title,
      description: body.description,
      imageId: asset.id,
      metaScore: body.metaScore,
      userId,
    });

    return await movieRepo.save(movie);
  }
  async findMany(ctx: RequestContext) {
    const movieRepo = this.connection.getRepository(ctx, Movie);
    const movies = await movieRepo.find({
      relations: { image: true, user: true },
    });

    return movies;
  }

  // async addReview(ctx: RequestContext, details: CreateReviewDTO) {
  //   const reviewRepo = this.connection.getRepository(ctx, Review);
  //   const movieRepo = this.connection.getRepository(ctx, Movie);

  //   const review = new Review({
  //     movieId: details.movieId,
  //     userId: details.userId,
  //     score: details.score,
  //   });

  //   await reviewRepo.save(review);

  //   // Recalculate the user score average
  //   const movie = await movieRepo.findOne({
  //     where: { id: details.movieId },
  //     relations: { review: true },
  //   });

  //   if (!movie) {
  //     throw new NotFoundException('Movie not found');
  //   }

  //   const userScores = movie.review.map((r) => r.score);

  //   movie.userScore = userScores.length
  //     ? userScores.reduce((a, b) => a + b, 0) / userScores.length
  //     : 0;

  //   return await movieRepo.save(movie);
  // }

  async delete(ctx: RequestContext, movieId: string) {
    const movieRepo = this.connection.getRepository(ctx, Movie);

    const movie = await movieRepo.findOne({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return await movieRepo.remove(movie);
  }
}
