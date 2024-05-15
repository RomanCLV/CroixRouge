import { Body, Controller, Post, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { CreateProductPipe } from './pipes/create-product.pipe';
import { CreateProductDto, createProductSchema } from './DTOs/create-product.dto';
import { ProductsService } from './products.service';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { ProductImagesProductAssociation } from './interfaces/product-images-product-association.interface';
import { ProductImagesProductInterceptor } from './interceptors/product-img-association.interceptor';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @UseFilters(DatabaseException)
    @UsePipes(new CreateProductPipe(createProductSchema))
    @UseInterceptors(ProductImagesProductInterceptor)
    create(@Body() product: CreateProductDto): Promise<ProductImagesProductAssociation> {
        return this.productsService.create(product);
    }
}