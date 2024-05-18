import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity("carts")
export class Cart {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Product, { nullable: true })
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product: Product;
}
