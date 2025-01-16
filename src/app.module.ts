import { Module } from '@nestjs/common';
import configuration from '@config/configuration';
import { ConfigModule } from '@nestjs/config';
import { ConnectionModule } from '@modules/connecion/connection.module';
import { UserModule } from '@modules/user/user.module';
import { MovieModule } from '@modules/movie/movie.module';
import { AssetModule } from '@modules/asset/asset.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'guard/jwt.guard';
import { WishlistModule } from '@modules/wishlist/wishlist.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    MovieModule,
    AssetModule,
    WishlistModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),

    ConnectionModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
