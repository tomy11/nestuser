import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { json } from 'body-parser';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({ origin: process.env.CORS_ORIGIN || '*' });

  const config = new DocumentBuilder()
    .setTitle('Nestuser API')
    .setDescription('User, company and department API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);
  new Logger('Bootstrap').log(`Application listening on port ${port}`);
}
bootstrap();
