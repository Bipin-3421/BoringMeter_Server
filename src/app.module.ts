import { Module } from '@nestjs/common';
import configuration from 'config/configuration';
import { ConfigModule } from '@nestjs/config';
import { ConnectionModule } from 'modules/connecion/connection.module';
import { UserModule } from 'modules/user/user.module';
import { MovieModule } from 'modules/movie/movie.module';
import { AssetModule } from 'modules/asset/asset.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestContextInterceptor } from 'common/request-context.interceptor';

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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestContextInterceptor,
    },
  ],
})
export class AppModule {}
