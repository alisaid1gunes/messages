import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../users/entities/user.entity";
import {Room} from "../rooms/entities/room.entity";
import {RoomMessage} from "../room-messages/entities/rom-message.entity";
import {Chance} from 'chance';

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(RoomMessage)
        private readonly roomMessageRepository: Repository<RoomMessage>,
    ) {
    }

    async seed() {
        const chance = new Chance();


        const userCount = 10;
        const users = [];

        for (let i = 0; i < userCount; i++) {
            const user = new User();
            user.fullName = chance.name();
            user.photo = chance.avatar();
            users.push(await this.userRepository.save(user));
        }


        const roomCount = 5;
        const rooms = [];

        for (let i = 0; i < roomCount; i++) {
            const room = new Room();
            rooms.push(await this.roomRepository.save(room));
        }

        // Create room messages
        const messageCount = 20;

        for (let i = 0; i < messageCount; i++) {
            const message = new RoomMessage();
            message.content = chance.sentence();
            const randomTimestamp = chance.timestamp();
            message.createdAt = new Date(randomTimestamp * 1000);
            message.sender = chance.pickone(users);
            message.receiver = chance.pickone(users);
            message.room = chance.pickone(rooms);
            await this.roomMessageRepository.save(message);
        }

        console.log("Seed complete.");
    }
}
