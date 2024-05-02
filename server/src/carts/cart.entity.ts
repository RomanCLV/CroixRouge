import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity("carts")
export class Cart {

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product: Product;

    @Column({ type: 'tinyint' })
    available: number;
}
