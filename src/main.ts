import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfig } from './config/configuration';
import { ConfigService } from '@nestjs/config';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);

  app.use(
    cors({
      origin: '*',
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('BoringMeter')
    .setDescription('Api specification for BoringMeter backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'boringmeterbackend',
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false, // Automatically remove properties not defined in DTOs
      forbidNonWhitelisted: true, // Throw error if extra fields are provided
      transform: true, // Automatically transform payloads to match DTOs
    }),
  );

  const port = configService.get('port', { infer: true });

  await app.listen(port, () => {
    Logger.log(`Server is working on port:${port}`);
  });
}
bootstrap();
