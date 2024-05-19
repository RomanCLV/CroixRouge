import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { CartsModule } from './carts/carts.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('DATABASE_HOST'),
                port: configService.get<number>('DATABASE_PORT'),
                username: configService.get<string>('DATABASE_USER'),
                password: configService.get<string>('DATABASE_PASSWORD'),
                database: configService.get<string>('DATABASE_NAME'),
                entities: [Category, Size, Gender, User, City, Product, ProductImages, Cart, CityAdmin, SuperAdmin],
                synchronize: false, 
            }),
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
        CartsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(JsonHeaderMiddleware).forRoutes('*');
    }
}
