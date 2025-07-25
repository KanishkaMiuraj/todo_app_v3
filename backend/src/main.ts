import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Main application entry point.
 * This function bootstraps the NestJS application.
 */
async function bootstrap() {
  // Create a NestJS application instance from AppModule
  const app = await NestFactory.create(AppModule);

  // Enable CORS (Cross-Origin Resource Sharing)
  // This is crucial for allowing your frontend (running on a different port/origin)
  // to make requests to this backend API.
  app.enableCors({
    origin: '*', // Allow requests from any origin. For production, specify your frontend's URL.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow common HTTP methods
    credentials: true, // Allow cookies to be sent (if applicable)
  });

  // Enable global validation pipes for DTOs
  // This automatically validates incoming request bodies against your DTOs
  // (e.g., CreateTaskDto, UpdateTaskDto) using class-validator.
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties that are not defined in the DTO
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    transform: true, // Automatically transform payloads to DTO instances
  }));

  // Start the application and listen for incoming requests on port 3000
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

// Call the bootstrap function to start the application
bootstrap();
