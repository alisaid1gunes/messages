// room-message.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import {User} from "../../users/entities/user.entity";
import {Room} from "../../rooms/entities/room.entity";

@Entity()
export class RoomMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'senderId' })
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'receiverId' })
    receiver: User;

    @ManyToOne(() => Room, (room) => room.messages)
    room: Room;

    @Column({ default: false })
    isDeleted: boolean;
}
