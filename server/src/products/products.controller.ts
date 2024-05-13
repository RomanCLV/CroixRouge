import { Body, Controller, Post, UseFilters, UsePipes } from '@nestjs/common';
import { CreateProductPipe } from './pipes/create-product.pipe';
import { CreateProductDto, createProductSchema } from './DTOs/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { DatabaseException } from 'src/filters/databaseException.filter';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @UseFilters(DatabaseException)
    @UsePipes(new CreateProductPipe(createProductSchema))
    create(@Body() product: CreateProductDto): Promise<Product> {
        return this.productsService.create(product);
    }
}