import { AssetProvider } from '@common/enum/provider.enum';

export interface AppConfig {
  port: number;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };

  user: {
    email: string;
    phoneNumber: string;
    password: string;
  };

  assetProvider: {
    name: AssetProvider;
    local: {
      rootpath: string;
    };
  };

  jwt: {
    jwtSecret: string;
    jwtTimeout: string;
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

    user: {
      email: process.env.SUPERADMINEMAIL ?? '',
      phoneNumber: process.env.SUPERADMINPHONENUMBER ?? '',
      password: process.env.SUPERADMINPASSWORD ?? '',
    },

    assetProvider: {
      name: (process.env.ASSET_PROVIDER ??
        AssetProvider.LOCAL) as AssetProvider,
      local: {
        rootpath: process.env.ASSET_LOCAL_PROVIDER ?? 'uploads',
      },
    },

    jwt: {
      jwtSecret: process.env.JWT_SECRET_KEY ?? '__change__me',
      jwtTimeout: process.env.JWT_TIMEOUT ?? '15d',
    },
  };

  return config;
};
