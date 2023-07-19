import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

export default function createSwaggerConfig(app){
    const config = new DocumentBuilder()
        .setTitle('Messages')
        .setDescription('Users last messages and message rooms')
        .setVersion('1.0')
        .addTag('messages')
        .build();


    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
