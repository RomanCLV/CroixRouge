import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity("cities")
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64, unique: true })
    name: string;

    @Column({ length: 128 })
    address: string;

    @Column({ type: 'decimal', precision: 11, scale: 8 })
    lat: number;

    @Column({ type: 'decimal', precision: 11, scale: 8 })
    lng: number;

    @Column({ length: 256 })
    image_path: string;

    @CreateDateColumn()
    creation_date: Date;
}
