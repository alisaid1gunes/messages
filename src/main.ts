import {NestFactory} from '@nestjs/core';
import helmet from 'helmet';
import {AppModule} from './app.module';
import configuration from "./config/configuration";
import {CustomResponseInterceptor} from "./interceptors/CustomResponseInterceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.use(helmet());
    app.useGlobalInterceptors(new CustomResponseInterceptor());
    await app.listen(configuration().port);
}

bootstrap();
