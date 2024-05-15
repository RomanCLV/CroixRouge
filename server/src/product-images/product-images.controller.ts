import { Controller, Get, UseFilters } from '@nestjs/common';
import { ProductImagesService } from './product-images.service';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { ProductImagesEntity } from './product-images.entity';

@Controller('product-images')
export class ProductImagesController {

    constructor(private readonly productimagesService: ProductImagesService) { }

    @Get()
    @UseFilters(DatabaseException)
    findAll(): Promise<ProductImagesEntity[]> {
        return this.productimagesService.findAll();
    }

}

