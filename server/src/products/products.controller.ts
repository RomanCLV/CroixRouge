import { BadRequestException, Body, Controller, Get, Param, Post, Query, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { CreateProductPipe } from './pipes/create-product.pipe';
import { CreateProductDto, createProductSchema } from './DTOs/create-product.dto';
import { ProductsService } from './products.service';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { ProductImagesProductAssociation } from './interfaces/product-images-product-association.interface';
import { ProductImagesProductInterceptor } from './interceptors/product-img-association.interceptor';
import { ProductImagesProductsInterceptor } from './interceptors/products-img-association.interceptor copy';
import { SearchProductPipe } from './pipes/search.pipe';
import { SearchProductDto, searchProductSchema } from './DTOs/search-product.dto';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) { }

    @Post()
    @UseFilters(DatabaseException)
    @UsePipes(new CreateProductPipe(createProductSchema))
    @UseInterceptors(ProductImagesProductInterceptor)
    async create(@Body() product: CreateProductDto): Promise<ProductImagesProductAssociation> {
        return await this.productsService.create(product);
    }

    @Get("/search")
    @UseFilters(DatabaseException)
    @UseInterceptors(ProductImagesProductsInterceptor)
    async findAll(): Promise<ProductImagesProductAssociation[]> {
        return await this.productsService.findAll();
    }

    @Get("/search/:query")
    @UseFilters(DatabaseException)
    @UseInterceptors(ProductImagesProductsInterceptor)
    async searchProducts(@Param("query") query: string): Promise<ProductImagesProductAssociation[]> {
        const q = this.prepareQuery(query);
        return await this.productsService.search(q);
    }
    
    private prepareQuery(query: string): SearchProductDto {
        const args = query.split("&");
        const q: SearchProductDto = {};

        let cityDone = false;
        let textDone = false;
        let categoriesDone = false;
        let gendersDone = false;
        let sizesDone = false;
        let stateDone = false;
        let minimumPriceDone = false;
        let maximumPriceDone = false;
        let limitDone = false;

        for (let index = 0; index < args.length; index++) {
            const arg = args[index];
            const tmp = arg.split("=");
            const key = tmp[0];
            const values = tmp[1].split("|");

            if (key === "city") {
                if (values.length === 0) {
                    throw new BadRequestException("city value empty.");
                }
                else if (values.length > 1) {
                    throw new BadRequestException("too many city values.");
                }
                else if (cityDone) {
                    throw new BadRequestException("too many city fields.");
                }
                cityDone = true;
                q.city = values[0];
            }
            else if (key === "text") {
                if (values.length === 0) {
                    throw new BadRequestException("text value empty.");
                }
                else if (values.length > 1) {
                    throw new BadRequestException("too many text values.");
                }
                else if (textDone) {
                    throw new BadRequestException("too many text fields.");
                }
                cityDone = true;
                q.text = values[0];
            }
            else if (key === "categories") {
                if (values.length === 0) {
                    throw new BadRequestException("categories value empty.");
                }
                else if (categoriesDone) {
                    throw new BadRequestException("too many categories fields.");
                }
                categoriesDone = true;
                q.categories = values;
            }
            else if (key === "genders") {
                if (values.length === 0) {
                    throw new BadRequestException("genders value empty.");
                }
                else if (gendersDone) {
                    throw new BadRequestException("too many genders fields.");
                }
                gendersDone = true;
                q.genders = values;
            }
            else if (key === "sizes") {
                if (values.length === 0) {
                    throw new BadRequestException("sizes value empty.");
                }
                else if (sizesDone) {
                    throw new BadRequestException("too many sizes fields.");
                }
                sizesDone = true;
                q.sizes = values;
            }
            else if (key === "state") {
                if (values.length === 0) {
                    throw new BadRequestException("state value empty.");
                }
                else if (values.length > 1) {
                    throw new BadRequestException("too many state values.");
                }
                else if (stateDone) {
                    throw new BadRequestException("too many state fields.");
                }
                const value = parseInt(values[0]);
                if (isNaN(value)) {
                    throw new BadRequestException("state is not an integer.");
                }
                if (value < 1 || value > 5) {
                    throw new BadRequestException("state is not between 1 and 5.");
                }
                stateDone = true;
                q.state = value;
            }
            else if (key === "minimumPrice") {
                if (values.length === 0) {
                    throw new BadRequestException("minimumPrice value empty.");
                }
                else if (values.length > 1) {
                    throw new BadRequestException("too many minimumPrice values.");
                }
                else if (minimumPriceDone) {
                    throw new BadRequestException("too many minimumPrice fields.");
                }
                const value = parseFloat(values[0]);
                if (isNaN(value)) {
                    throw new BadRequestException("minimumPrice is not a number.");
                }
                if (value < 0) {
                    throw new BadRequestException("minimumPrice is lower than 0.");
                }
                minimumPriceDone = true;
                q.minimumPrice = value;
            }
            else if (key === "maximumPrice") {
                if (values.length === 0) {
                    throw new BadRequestException("maximumPrice value empty.");
                }
                else if (values.length > 1) {
                    throw new BadRequestException("too many maximumPrice values.");
                }
                else if (maximumPriceDone) {
                    throw new BadRequestException("too many maximumPrice fields.");
                }
                const value = parseFloat(values[0]);
                if (isNaN(value)) {
                    throw new BadRequestException("maximumPrice is not a number.");
                }
                if (value < 0) {
                    throw new BadRequestException("maximumPrice is lower than 0.");
                }
                maximumPriceDone = true;
                q.maximumPrice = value;
            }
            else if (key === "limit") {
                if (values.length === 0) {
                    throw new BadRequestException("limit value empty.");
                }
                else if (values.length > 1) {
                    throw new BadRequestException("too many limit values.");
                }
                else if (limitDone) {
                    throw new BadRequestException("too many limit fields.");
                }
                const value = parseInt(values[0]);
                if (isNaN(value)) {
                    throw new BadRequestException("limit is not an integer.");
                }
                if (value < 0) {
                    throw new BadRequestException("limit is lower than 0.");
                }
                limitDone = true;
                q.limit = value;
            }
        }

        return q;
    }
}