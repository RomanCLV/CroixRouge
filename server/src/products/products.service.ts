import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './DTOs/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { GendersService } from 'src/genders/genders.service';
import { SizesService } from 'src/sizes/sizes.service';
import { CitiesService } from 'src/cities/cities.service';
import { ProductImagesService } from 'src/product-images/product-images.service';
import { ProductImagesProductAssociation } from './interfaces/product-images-product-association.interface';
import { SearchProductDto } from './DTOs/search-product.dto';

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
        @Inject(ProductImagesService)
        private readonly productImagesService: ProductImagesService,
    ) { }

    private async createAssociationsFromProducts(products: Product[]): Promise<ProductImagesProductAssociation[]> {
        const associations: ProductImagesProductAssociation[] = [];
        for (let index = 0; index < products.length; index++) {
            const product = products[index];
            const images = await this.productImagesService.findImagesByProductId(product.id);
            associations.push({product, images});
        }
        return associations;
    } 

    async findAll(): Promise<ProductImagesProductAssociation[]> {
        const products = await this.productsRepository.find();
        if (!products) {
            throw new NotFoundException("Products not found");
        }
        return await this.createAssociationsFromProducts(products);
    }

    async search(query: SearchProductDto): Promise<ProductImagesProductAssociation[]> {
        const qb = this.productsRepository.createQueryBuilder('product');
    
        // Join related tables
        qb.leftJoinAndSelect('product.city', 'city')
          .leftJoinAndSelect('product.size', 'size')
          .leftJoinAndSelect('product.gender', 'gender')
          .leftJoinAndSelect('product.category', 'category');
    
        // Filter by city
        if (query.city) {
          qb.andWhere('city.name = :city', { city: query.city });
        }
    
        // Filter by text in title or description
        if (query.text) {
          qb.andWhere('(product.title LIKE :text OR product.description LIKE :text)', { text: `%${query.text}%` });
        }
    
        // Filter by categories
        if (query.categories && query.categories.length > 0) {
          qb.andWhere('category.category IN (:...categories)', { categories: query.categories });
        }
    
        // Filter by genders
        if (query.genders && query.genders.length > 0) {
          qb.andWhere('gender.gender IN (:...genders)', { genders: query.genders });
        }
    
        // Filter by sizes
        if (query.sizes && query.sizes.length > 0) {
          qb.andWhere('size.size IN (:...sizes)', { sizes: query.sizes });
        }
    
        // Filter by state
        if (query.state !== undefined) {
          qb.andWhere('product.state = :state', { state: query.state });
        }
    
        // Filter by price range
        if (query.minimumPrice !== undefined && query.minimumPrice > 0) {
          qb.andWhere('product.price >= :minimumPrice', { minimumPrice: query.minimumPrice });
        }
        if (query.maximumPrice !== undefined) {
          qb.andWhere('product.price <= :maximumPrice', { maximumPrice: query.maximumPrice });
        }
    
        // Set limit for pagination
        if (query.limit !== undefined) {
          qb.limit(query.limit);
        }
    
        // Execute the query and return results
        const products = await qb.getMany();
        return await this.createAssociationsFromProducts(products);
      }

    async create(productData: CreateProductDto): Promise<ProductImagesProductAssociation> {
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

        if (!newProduct) {
            throw new HttpException("Product not created", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const productSaved = await this.productsRepository.save(newProduct);
        if (!productSaved) {
            throw new HttpException("Product not save", HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const imagesSaved = await this.productImagesService.saveImagesOfProduct(productSaved, productData.images);

        const association: ProductImagesProductAssociation = {
            product: productSaved,
            images: imagesSaved
        }

        return association;
    }
}