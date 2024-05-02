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

import { User } from './users/user.entity';
import { ApiKey } from './apiKeys/apiKey.entity';
import { Cart } from './carts/cart.entity';
import { Category } from './categories/category.entity';
import { Size } from './sizes/size.entity';
import { Gender } from './genders/gender.entity';
import { City } from './cities/city.entity';
import { Product } from './products/product.entity';
import { ProductImage } from './products/productImage.entity';
import { CityAdmin } from './cityAdmins/cityAdmin.entity';
import { SuperAdmin } from './superAdmins/superAdmin.entity';

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
      entities: [ApiKey, Category, Size, Gender, User, City, Product, ProductImage, Cart, CityAdmin, SuperAdmin],
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
