import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoomMessage} from "./entities/rom-message.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RoomMessage])],
  exports: [TypeOrmModule]
})
export class RoomMessagesModule {}
