import { ConsoleLogger, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './DTOs/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { GendersService } from 'src/genders/genders.service';
import { SizesService } from 'src/sizes/sizes.service';
import { CitiesService } from 'src/cities/cities.service';
import { error } from 'console';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @Inject(CitiesService)
        private readonly citiesService: CitiesService,
        @Inject(CategoriesService)
        private readonly categoriesService: CategoriesService,
        @Inject(GendersService)
        private readonly gendersService: GendersService,
        @Inject(SizesService)
        private readonly sizesService: SizesService,
    ) { }

    async findByTitle(title: string): Promise<Product> {
        return await this.productsRepository.findOne({ where: { title: title } });
    }

    async create(productData: CreateProductDto): Promise<Product> {
        const city = await this.citiesService.findCityByName(productData.city);
        if (!city) {
            throw new NotFoundException(`City ${productData.city} not found`);
        }
        const category = await this.categoriesService.findByCategory(productData.category);
        if (!category) {
            throw new NotFoundException(`Category ${productData.category} not found`);
        }
        const gender = await this.gendersService.findByGender(productData.gender);
        if (!gender) {
            throw new NotFoundException(`Gender ${productData.gender} not found`);
        }
        const size = await this.sizesService.findBySize(productData.size);
        if (!size) {
            throw new NotFoundException(`Size ${productData.size} not found`);
        }

        const newProduct = this.productsRepository.create({
            title: productData.title,
            description: productData.description,
            price: productData.price,
            state: productData.state,
            city: city,
            size: size,
            gender: gender,
            category: category,
        });

        console.log(newProduct);

        if (!newProduct) {
            throw new HttpException("Product not created", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const savedProduct = await this.productsRepository.save(newProduct);
        console.log(savedProduct);
        return savedProduct;
    }
}