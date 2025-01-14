import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from '../app.module';

export const setupTestApp = async (): Promise<INestApplication> => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule], // Import your main application module
  }).compile();

  const app = moduleFixture.createNestApplication();

  // Add a global validation pipe to mimic production behavior
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically remove unwanted fields
      forbidNonWhitelisted: true, // Throw errors for extra fields
      transform: true, // Automatically transform DTOs to their expected types
    }),
  );

  return app;
};
