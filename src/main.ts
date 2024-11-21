import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfig } from './config/configuration';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService<AppConfig, true>>(ConfigService);

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

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = configService.get('port', { infer: true });

  await app.listen(port, () => {
    Logger.log(`Server is working on port:${port}`);
  });
}
bootstrap();
