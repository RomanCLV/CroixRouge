import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { City } from '../cities/city.entity';
import { Size } from '../sizes/size.entity';
import { Gender } from '../genders/gender.entity';

@Entity("products")
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

    @CreateDateColumn()
    creationDate: Date;
}
