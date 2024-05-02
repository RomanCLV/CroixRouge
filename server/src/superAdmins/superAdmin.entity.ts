import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class SuperAdmin {
    //@PrimaryGeneratedColumn()
    //id: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}