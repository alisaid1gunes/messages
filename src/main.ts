import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from "./config/configuration";
import {CustomResponseInterceptor} from "./interceptors/CustomResponseInterceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new CustomResponseInterceptor());
  await app.listen(configuration().port);
}
bootstrap();
