import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from "dotenv";
import { MongoConnection } from './infrastructure/database/mongoose-connection';
import { AppModule } from './infrastructure/http/app.module';

dotenv.config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  const startServer = async () => {
    try {
      await MongoConnection();
      const port = process.env.DOCKER_BACKEND_PORT;

      await app.listen(port);
      console.log(`🚀 Server running on port ${port}`);
    }
    catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
      process.exit(1); // Encerrar o processo caso a conexão falhe
    }
  }
  startServer();
}

bootstrap();