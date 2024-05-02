import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity("carts")
export class Cart {

    /**
     * ! This is a fake attribute
     * This is a workaround for TypeORM's `MissingPrimaryColumnError`
     **/
    @PrimaryColumn({ type: 'uuid', insert: false, select: false, update: false })
    id: never;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product: Product;

    @Column({ type: 'tinyint' })
    available: number;
}
