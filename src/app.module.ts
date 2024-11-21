import { Module } from '@nestjs/common';
import configuration from 'config/configuration';
import { ConfigModule } from '@nestjs/config';

import { ConnectionModule } from 'modules/connecion/connection.module';
import { UserModule } from 'modules/user/user.module';
import { MovieModule } from 'modules/movie/movie.module';
import { AssetModule } from 'modules/asset/asset.module';

@Module({
  imports: [
    UserModule,
    MovieModule,
    AssetModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    ConnectionModule.forRoot(),
  ],
})
export class AppModule {}
