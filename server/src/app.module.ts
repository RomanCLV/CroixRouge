import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { SizesModule } from './sizes/sizes.module';
import { GendersModule } from './genders/genders.module';
import { CitiesModule } from './cities/cities.module';

import { User } from './users/user.entity';
import { Cart } from './carts/cart.entity';
import { Category } from './categories/category.entity';
import { Size } from './sizes/size.entity';
import { Gender } from './genders/gender.entity';
import { City } from './cities/city.entity';
import { Product } from './products/product.entity';
import { ProductImages } from './product-images/product-images.entity';
import { CityAdmin } from './city-admins/city-admin.entity';
import { SuperAdmin } from './super-admins/super-admin.entity';
import { JsonHeaderMiddleware } from './middlewares/json-header.middleware';
import { CityAdminsModule } from './city-admins/city-admins.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { SuperAdminsModule } from './super-admins/super-admins.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ".env" }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD || "",
            database: process.env.DATABASE_NAME,
            entities: [Category, Size, Gender, User, City, Product, ProductImages, Cart, CityAdmin, SuperAdmin],
            synchronize: false,
        }),
        AuthModule,
        UsersModule,
        CitiesModule,
        CategoriesModule,
        SizesModule,
        GendersModule,
        ProductsModule,
        CityAdminsModule,
        ProductImagesModule,
        SuperAdminsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JsonHeaderMiddleware).forRoutes('*');
    }
}
