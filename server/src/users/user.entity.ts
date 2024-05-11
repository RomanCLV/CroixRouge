import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    username: string;

    @Column({ length: 64, unique: true })
    email: string;

    @Column({ length: 64 })
    password: string;

    @CreateDateColumn()
    creation_date: Date;

    @Column({ length: 256, default: "" })
    image_path: string;
}