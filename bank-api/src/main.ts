import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const docConfig = new DocumentBuilder()
    .setTitle('Bank API')
    .setDescription('Bank API with DDD implementation')
    .setVersion('1.0')
    .addTag('bank')
    .setContact(
      'Samuel Ricardo',
      'https://www.linkedin.com/in/samuel-ricardo/',
      'samuelricardoofficial@gmail.com',
    )
    .setLicense(
      'MIT',
      'https://github.com/Samuel-Ricardo/BankAPI/blob/main/LICENSE',
    )
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
