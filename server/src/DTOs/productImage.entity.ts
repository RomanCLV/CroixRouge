import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ length: 256 })
    imagePath: string;
}
