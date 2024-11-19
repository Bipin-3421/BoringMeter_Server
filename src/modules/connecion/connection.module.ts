import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllEntities } from 'common/entities/index';
import { AppConfig } from 'config/configuration';

import { TransactionalConnection } from './connection.service';

let defaultTypeOrmModule: DynamicModule;

@Module({
  providers: [TransactionalConnection],
  exports: [TransactionalConnection],
})
export class ConnectionModule {
  static forRoot(): DynamicModule {
    if (!defaultTypeOrmModule) {
      defaultTypeOrmModule = TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService<AppConfig, true>) => {
          console.log('allentities', AllEntities);

          const dbConfig = configService.get('database', { infer: true });
          console.log(dbConfig);

          return {
            type: 'postgres',
            host: dbConfig.host,
            port: dbConfig.port,
            username: dbConfig.username,
            password: dbConfig.password,
            database: dbConfig.database,
            entities: AllEntities,
            synchronize: true,
            logging: true,
          };
        },
      });
    }

    return {
      module: ConnectionModule,
      imports: [defaultTypeOrmModule],
      exports: [defaultTypeOrmModule],
      global: true,
    };
  }
}
