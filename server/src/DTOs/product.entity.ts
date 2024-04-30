import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { City } from './city.entity';
import { Size } from './size.entity';
import { Gender } from './gender.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 64 })
    title: string;

    @Column({ length: 512 })
    description: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'tinyint' })
    state: number;

    @ManyToOne(() => City)
    @JoinColumn({ name: 'city_id' })
    city: City;

    @ManyToOne(() => Size)
    @JoinColumn({ name: 'size_id' })
    size: Size;

    @ManyToOne(() => Gender)
    @JoinColumn({ name: 'gender_id' })
    gender: Gender;

    @Column({ type: 'datetime' })
    creationDate: Date;
}
