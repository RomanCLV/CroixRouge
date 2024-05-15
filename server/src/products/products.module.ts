import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoriesService } from 'src/categories/categories.service';
import { GendersService } from 'src/genders/genders.service';
import { SizesService } from 'src/sizes/sizes.service';
import { CitiesService } from 'src/cities/cities.service';
import { ProductImagesService } from 'src/product-images/product-images.service';
import { Product } from './product.entity';
import { Category } from 'src/categories/category.entity';
import { Gender } from 'src/genders/gender.entity';
import { Size } from 'src/sizes/size.entity';
import { City } from 'src/cities/city.entity';
import { ProductImages } from 'src/product-images/product-images.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Gender]),
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([Size]),
    TypeOrmModule.forFeature([ProductImages]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService, GendersService, SizesService, CitiesService, ProductImagesService]
})
export class ProductsModule { }