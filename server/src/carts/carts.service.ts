import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class CartsService {
    constructor (
        @InjectRepository(Cart)
        private readonly cartsRepository: Repository<Cart>,
        @Inject(UsersService)
        private readonly usersService: UsersService,
        @Inject(ProductsService)
        private readonly productsService: ProductsService
    ) { }

    async createCart(user: any, productId: number): Promise<Cart> {
        const fullUser: User = await this.usersService.findByEmail(user.email);
        if (!fullUser) {
            throw new NotFoundException(`User with id ${user.email} not found`);
        }

        const product = await this.productsService.findProductById(productId);
        if (!product) {
            throw new NotFoundException(`Product with id ${productId} not found`);
        }

        const cart = this.cartsRepository.create({
            user: fullUser,
            product: product.product
        });

        return await this.cartsRepository.save(cart);
    }

    async getCartOfUser(user: any): Promise<Cart[]> {
        const fullUser: User = await this.usersService.findByEmail(user.email);
        if (!fullUser) {
            throw new Error(`User with id ${user.email} not found`);
        };

        return await this.cartsRepository.find({
            where: {user: {id: fullUser.id}},
            relations: ["product", "product.city", "product.gender", "product.category", "product.size"],
        });
    }

    async deleteCart(user: any, productId: number): Promise<boolean> {
        const fullUser: User = await this.usersService.findByEmail(user.email);
        if (!fullUser) {
            throw new Error(`User with id ${user.email} not found`);
        };

        const carts = await this.cartsRepository.find({
            where: {
                user: {id: fullUser.id},
                product: {id: productId}
            }
        })
        let deleted = 0;
        for (let i = 0; i < carts.length; i++) {
            const deletion = await this.cartsRepository.delete(carts[i]);
            if (deletion.affected > 0) {
                deleted++;
            }
        }

        return deleted > 0;
    }

    async deleteCartOfUser(user: any): Promise<boolean> {
        const fullUser: User = await this.usersService.findByEmail(user.email);
        if (!fullUser) {
            throw new Error(`User with id ${user.email} not found`);
        };

        const carts = await this.cartsRepository.find({
            where: {user: {id: fullUser.id}}
        })
        let deleted = 0;
        for (let i = 0; i < carts.length; i++) {
            const deletion = await this.cartsRepository.delete(carts[i]);
            if (deletion.affected > 0) {
                deleted++;
            }
        }

        return deleted > 0;
    }
}
