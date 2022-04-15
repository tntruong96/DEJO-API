import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import  helmet from 'helmet';
import {rateLimit} from 'express-rate-limit'

async function bootstrap() {
 
  console.log(process.env.DATABASE_URL)
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose'],
    cors: {
      origin: true
    }
  });
  
  app.setGlobalPrefix("/api")

  app.use(helmet());

  app.use(rateLimit({windowMs: 15*60*1000, max: 1000}))

  app.use(cookieParser())


  //Pipes and interceptors

  app.useGlobalPipes(new ValidationPipe());
  
  await app.listen(3000);
}
bootstrap();
