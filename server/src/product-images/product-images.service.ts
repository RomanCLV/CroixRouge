import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ProductImages } from './product-images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/product.entity';

@Injectable()
export class ProductImagesService {

    constructor(
        @InjectRepository(ProductImages)
        private readonly productImagesRepository: Repository<ProductImages>,
    ) { }

    async findAll(): Promise<ProductImages[]> {
        const productImages = await this.productImagesRepository.find();
        if (!productImages) {
            throw new NotFoundException(`productImages not found.`)
        }
        return productImages;
    }

    async findImagesByProductId(productId: number): Promise<ProductImages[]> {
        return await this.productImagesRepository.findBy({ product: { id: productId } });
    }

    async saveImagesOfProduct(product: Product, imagesPath: string[]): Promise<ProductImages[]> {
        const imagesSaved: ProductImages[] = [];

        for (let index = 0; index < imagesPath.length; index++) {
            const imagePath = imagesPath[index];
            const productImageCreated = this.productImagesRepository.create({
                product: product,
                image_path: imagePath
            });
            if (!productImageCreated) {
                throw new HttpException("product image not created", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const productImageSaved = await this.productImagesRepository.save(productImageCreated);
            if (!productImageSaved) {
                throw new HttpException("product image not save", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            imagesSaved.push(productImageSaved);
        }

        return imagesSaved;
    }
}
