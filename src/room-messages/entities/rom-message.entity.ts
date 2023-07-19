// room-message.entity.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn, Index,
} from 'typeorm';
import {User} from "../../users/entities/user.entity";
import {Room} from "../../rooms/entities/room.entity";

@Entity()
export class RoomMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:255})
    content: string;

    @Index()
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Index()
    @ManyToOne(() => User)
    @JoinColumn({name: 'senderId'})
    sender: User;

    @Index()
    @ManyToOne(() => User)
    @JoinColumn({name: 'receiverId'})
    receiver: User;

    @Index()
    @ManyToOne(() => Room, (room) => room.messages)
    room: Room;

    @Column({default: false})
    isDeleted: boolean;
}
