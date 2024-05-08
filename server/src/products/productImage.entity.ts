import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity("product_images")
export class ProductImage {
   
    /**
     * ! This is a fake attribute
     * This is a workaround for TypeORM's `MissingPrimaryColumnError`
     **/
    @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
    id: never;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column({ length: 256 })
    image_path: string;
}
