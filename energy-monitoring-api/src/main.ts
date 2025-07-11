import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { json, urlencoded } from 'express';
import { ErrorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Güvenlik headers'ları ekle
  app.use(helmet());

  // Request size limiting
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Sadece DTO'da tanımlı alanları kabul et
      forbidNonWhitelisted: true, // Tanımlı olmayan alanları reddet
      transform: true, // Otomatik tip dönüşümü
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global error handler
  app.useGlobalInterceptors(new ErrorHandlerInterceptor());

  const config = new DocumentBuilder()
    .setTitle('API Dokümantasyonu')
    .setDescription('Uygulamanın Swagger API dokümantasyonu')
    .setVersion('1.0')
    .addBearerAuth() // JWT varsa
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // CORS güvenlik ayarları
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:5174',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400, // 24 saat
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
