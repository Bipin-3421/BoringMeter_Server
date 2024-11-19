import { AssetProvider } from 'common/enum/provider.enum';

export interface AppConfig {
  port: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };

  assetProvider: {
    name: AssetProvider;
    local: {
      rootpath: string;
    };
  };
}

export default () => {
  const config: AppConfig = {
    port: Number(process.env.PORT ?? '4001'),
    database: {
      host: process.env.DATABASE_HOST ?? 'localhost',
      port: Number(process.env.DATABASE_PORT ?? '5432'),
      username: process.env.DATABASE_USERNAME ?? 'postgres',
      password: process.env.DATABASE_PASSWORD ?? '12345',
      database: process.env.DATABASE_NAME ?? 'boringmeter',
    },
    assetProvider: {
      name: (process.env.ASSET_PROVIDER ??
        AssetProvider.LOCAL) as AssetProvider,
      local: {
        rootpath: process.env.ASSET_LOCAL_PROVIDER ?? 'uploads',
      },
    },
  };

  return config;
};
