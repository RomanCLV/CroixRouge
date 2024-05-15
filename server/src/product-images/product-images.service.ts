import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductImagesEntity } from './product-images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductImagesService {

    constructor(
        @InjectRepository(ProductImagesEntity)
        private readonly productImagesRepository: Repository<ProductImagesEntity>,
    ) { }

    async findAll(): Promise<ProductImagesEntity[]> {
        const productImages = await this.productImagesRepository.find();
        if (!productImages) {
            throw new NotFoundException(`productImages not found.`)
        }
        return productImages;
    }

}
