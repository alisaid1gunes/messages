import {Entity, PrimaryGeneratedColumn, Column, OneToMany, Index} from 'typeorm';
import {RoomMessage} from "../../room-messages/entities/rom-message.entity";


@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({default: false})
    isDeleted: boolean;

    @OneToMany(() => RoomMessage, (message) => message.room)
    messages: RoomMessage[];
}

