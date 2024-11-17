import { Module } from '@nestjs/common';
import { MovieModule } from './modules/movie/movie.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { ConnectionModule } from './modules/connecion/connection.module';
import { AssetModule } from './modules/asset/asset.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    MovieModule,
    AssetModule,
    UserModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ConnectionModule.forRoot(),
  ],
})
export class AppModule {}
