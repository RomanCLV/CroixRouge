import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("cities")
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    name: string;

    @Column({ length: 128 })
    address: string;

    @Column({ type: 'decimal', precision: 11, scale: 8 })
    lat: number;

    @Column({ type: 'decimal', precision: 11, scale: 8 })
    lng: number;

    @Column({ length: 256, nullable: true })
    imagePath: string;

    @Column({ type: 'datetime' })
    creationDate: Date;
}
