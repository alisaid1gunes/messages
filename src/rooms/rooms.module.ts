import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Room} from "./entities/room.entity";
import {RoomsService} from "./rooms.service";
import {RoomMapper} from "./mapper/RoomMapper";


@Module({
  controllers: [RoomsController],
  providers: [RoomsService, RoomMapper],
  imports: [TypeOrmModule.forFeature([Room])],
  exports: [TypeOrmModule]
})
export class RoomsModule {}
