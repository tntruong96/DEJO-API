import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from 'typeorm'

@Entity({name: 'users'})
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    userName: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column({default: 'user'})
    role: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;


}