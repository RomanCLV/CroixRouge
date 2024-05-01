import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { SizesModule } from './sizes/sizes.module';
import { GendersModule } from './genders/genders.module';
import { CitiesModule } from './cities/cities.module';

import { User } from './DTOs/user.entity';
import { ApiKey } from './DTOs/apiKey.entity';
import { Cart } from './DTOs/cart.entity';
import { Category } from './DTOs/category.entity';
import { Size } from './DTOs/size.entity';
import { Gender } from './DTOs/gender.entity';
import { City } from './DTOs/city.entity';
import { Product } from './DTOs/product.entity';
import { ProductImage } from './DTOs/productImage.entity';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env.development.local" }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [ApiKey, Category, Size, Gender, User, City, Product, ProductImage, Cart],
      synchronize: false, //Boolean(process.env.DEBUG),
    }),
    UsersModule,
    CitiesModule,
    CategoriesModule,
    SizesModule,
    GendersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
