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

    async createCart(user: any, productId: number): Promise<boolean> {
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

        await this.cartsRepository.save(cart);
        return true;
    }

    async getCartOfUser(user: any) {
        const fullUser: User = await this.usersService.findByEmail(user.email);
        if (!fullUser) {
            throw new Error(`User with id ${user.email} not found`);
        };

        return await this.cartsRepository.find({
            where: {user: {id: fullUser.id}},
            relations: ["product"]
        });
    }
}
