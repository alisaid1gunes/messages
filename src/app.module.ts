import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import {User} from "./users/entities/user.entity";
import { RoomsModule } from './rooms/rooms.module';
import {Room} from "./rooms/entities/room.entity";
import { RoomMessagesModule } from './room-messages/room-messages.module';
import { RoomMessagesModule } from './room-messages/room-messages.module';
import {RoomMessage} from "./room-messages/entities/rom-message.entity";


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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}