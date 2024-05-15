import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { GendersService } from 'src/genders/genders.service';
import { SizesService } from 'src/sizes/sizes.service';
import { Category } from 'src/categories/category.entity';
import { Gender } from 'src/genders/gender.entity';
import { Size } from 'src/sizes/size.entity';
import { CitiesService } from 'src/cities/cities.service';
import { City } from 'src/cities/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Gender]),
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([Size])
  ],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService, GendersService, SizesService, CitiesService]
})
export class ProductsModule { }