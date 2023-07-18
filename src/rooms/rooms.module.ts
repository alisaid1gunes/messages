import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Room} from "./entities/room.entity";
import {RoomService} from "./rooms.service";
import {RoomMapper} from "./mapper/RoomMapper";


@Module({
  controllers: [RoomsController],
  providers: [RoomService, RoomMapper],
  imports: [TypeOrmModule.forFeature([Room])],
  exports: [TypeOrmModule]
})
export class RoomsModule {}
