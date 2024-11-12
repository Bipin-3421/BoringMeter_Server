import { Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ConnectionModule } from './modules/connecion/connection.module';

@Module({
  imports: [
    MoviesModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ConnectionModule.forRoot(),
  ],
})
export class AppModule {}
