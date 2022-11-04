import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ServerConfig } from './config/server.config';

async function bootstrap() {
  const port = process.env.PORT || ServerConfig.PORT;

  const app = await NestFactory.create(AppModule);

  await app.listen(port);
}
bootstrap();
