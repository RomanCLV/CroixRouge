import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("product_images")
export class ProductImages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 11, unique: true })
    product_id: number;

    @Column({ length: 256 })
    image_path: string;
}