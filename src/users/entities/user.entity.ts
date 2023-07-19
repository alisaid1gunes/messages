import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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
}