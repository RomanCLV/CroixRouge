import { Module } from '@nestjs/common';
import { ProductImagesController } from './product-images.controller';
import { ProductImagesService } from './product-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImagesEntity } from './product-images.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductImagesEntity])],
  controllers: [ProductImagesController],
  providers: [ProductImagesService]
})
export class ProductImagesModule { }
