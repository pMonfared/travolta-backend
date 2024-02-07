import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import { VersioningType } from '@nestjs/common';
// This function bootstraps a Nest.js application. It sets up various middleware and configurations before starting the server.

// Import necessary modules and libraries
async function bootstrap() {
  // Create a Nest.js application instance
  const app = await NestFactory.create(AppModule);

  // Middleware to enhance security by setting various HTTP headers
  app.use(helmet());

  // Middleware to parse cookies in the incoming request
  app.use(cookieParser());

  // Middleware to handle CSRF protection, using cookies with same-site policy
  app.use(csurf({ cookie: { sameSite: true } }));

  // Middleware to enable Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified HTTP methods
    preflightContinue: false, // Disallow preflight requests from being passed to route handlers
    optionsSuccessStatus: 204, // Set the status code for successful OPTIONS requests
  });

  // Middleware to set CSRF token in response cookies and local variables
  app.use((req: any, res: any, next: any) => {
    const token = req.csrfToken(); // Generate CSRF token
    res.cookie('XSRF-TOKEN', token); // Set CSRF token in response cookie
    res.locals.csrfToken = token; // Make CSRF token available in local variables

    next(); // Move to the next middleware or route handler
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Start the server and listen on port 5000
  await app.listen(5000);
}

// Call the bootstrap function to start the application
bootstrap();
