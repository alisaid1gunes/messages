import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ default: false })
    isDeleted: boolean;

}

