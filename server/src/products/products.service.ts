import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './DTOs/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    async findByTitle(title: string): Promise<Product> {
        return await this.productsRepository.findOne({ where: { title: title } });
    }

    async create(productData: CreateProductDto): Promise<Product> {
        if (await this.findByTitle(productData.title)) {
            throw new HttpException("Product with this title already exists", HttpStatus.BAD_REQUEST);
        }

        const newProduct = this.productsRepository.create(productData);

        if (!newProduct) {
            throw new HttpException("Product not created", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return await this.productsRepository.save(newProduct);
    }
}