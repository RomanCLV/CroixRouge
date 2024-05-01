import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity("carts")
export class Cart {
    @PrimaryGeneratedColumn()
    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
    product: Product;

    @Column({ type: 'tinyint' })
    available: number;
}
