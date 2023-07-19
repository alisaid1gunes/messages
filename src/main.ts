import {NestFactory} from '@nestjs/core';
import helmet from 'helmet';
import * as compression from 'compression';
import {AppModule} from './app.module';
import configuration from "./config/configuration";
import {CustomResponseInterceptor} from "./interceptors/CustomResponseInterceptor";
import createSwaggerConfig from "./swagger/config";



async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    createSwaggerConfig(app);
    app.enableCors();
    app.use(helmet());
    app.useGlobalInterceptors(new CustomResponseInterceptor());
    app.use(compression({
        filter: function () {
            return true;
        }
    }));

    await app.listen(configuration().port);
}

bootstrap();
