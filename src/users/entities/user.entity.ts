import {Entity, PrimaryGeneratedColumn, Column, Index} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:100})
    fullName: string;

    @Column({length:100})
    photo: string;

    @Column({default: false})
    isDeleted: boolean;

    @Index()
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}