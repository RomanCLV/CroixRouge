import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { City } from 'src/cities/city.entity';
import { CityAdmin } from 'src/city-admins/city-admin.entity';
import { CitiesService } from 'src/cities/cities.service';
import { CityAdminsService } from 'src/city-admins/city-admins.service';
import { SuperAdminsService } from 'src/super-admins/super-admins.service';
import { Category } from 'src/categories/category.entity';
import { Gender } from 'src/genders/gender.entity';
import { Size } from 'src/sizes/size.entity';
import { GendersService } from 'src/genders/genders.service';
import { CategoriesService } from 'src/categories/categories.service';
import { SizesService } from 'src/sizes/sizes.service';
import { ProductImages } from 'src/product-images/product-images.entity';
import { ProductImagesService } from 'src/product-images/product-images.service';
import { SuperAdmin } from 'src/super-admins/super-admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cart, 
      User,
      Product,
      City,
      CityAdmin,
      SuperAdmin,
      Category,
      Gender,
      Size,
      ProductImages
    ]),
    AuthModule
  ],
  controllers: [CartsController],
  providers: [
    CartsService, 
    UsersService,
    ProductsService,
    CitiesService, 
    CityAdminsService, 
    SuperAdminsService, 
    GendersService, 
    CategoriesService, 
    SizesService,
    ProductImagesService
  ],
})
export class CartsModule {}
