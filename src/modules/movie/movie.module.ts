import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { AssetModule } from '../asset/asset.module';

@Module({
  imports: [AssetModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
