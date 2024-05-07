import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    username: string;

    @Column({ length: 64 })
    email: string;

    @Column({ length: 64 })
    password: string;

    @Column({ type: 'datetime' })
    creationDate: Date;

    @Column({ length: 256 })
    imagePath: string;
}