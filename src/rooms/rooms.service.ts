import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import {Room} from "./entities/room.entity";
import {RoomDTO} from "./dto/room.dto";
import {RoomMapper} from "./mapper/RoomMapper";
import {Pagination} from "../shared/pagination";

@Injectable()
export class RoomsService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        private readonly roomMapper: RoomMapper
    ) {
    }

    async getRooms(pagination: Pagination): Promise<{ rooms: RoomDTO[]; total: number }> {
        try {
            const skipCount = (pagination.page - 1) * pagination.pageSize;

            const [rooms, total] = await this.roomRepository
                .createQueryBuilder('room')
                .leftJoinAndSelect('room.messages', 'message')
                .leftJoinAndSelect('message.sender', 'sender')
                .leftJoinAndSelect('message.receiver', 'receiver')
                .where((qb) => {
                    const subQuery = qb
                        .subQuery()
                        .select('MAX(message.createdAt)', 'maxCreatedAt')
                        .from('room_message', 'message')
                        .where('message.roomId = room.id')
                        .getQuery();
                    return 'message.createdAt = (' + subQuery + ')';
                })
                .orderBy('message.createdAt', 'DESC')
                .limit(pagination.pageSize)
                .offset(skipCount)
                .getManyAndCount();


            const roomDTOs = rooms.map((room) => this.roomMapper.mapRoomToDTO(room));

            return {rooms: roomDTOs, total};
        } catch (error) {
            console.error(error)
            throw new Error("Message room error")
        }
    }


}
