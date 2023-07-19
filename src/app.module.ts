import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import configuration from './config/configuration';
import {User} from "./users/entities/user.entity";
import {RoomsModule} from './rooms/rooms.module';
import {Room} from "./rooms/entities/room.entity";
import {RoomMessage} from "./room-messages/entities/rom-message.entity";
import {RoomMessagesModule} from "./room-messages/room-messages.module";
import {SeedService} from './seed/seed.service';
import {APP_FILTER} from '@nestjs/core';
import {HttpExceptionFilter} from "./filters/http-exception.filter";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: configuration().database.host,
            port: configuration().database.port,
            username: configuration().database.username,
            password: configuration().database.password,
            database: configuration().database.name,
            entities: [User, Room, RoomMessage],
            synchronize: true,
        }),
        UsersModule,
        RoomsModule,
        RoomMessagesModule,
    ],
    providers: [ SeedService, {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter,
    },],
})
export class AppModule {
}