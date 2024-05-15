import { Controller, Get, Param, ParseIntPipe, UseFilters, UseInterceptors } from '@nestjs/common';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CategoriesInterceptor } from './interceptors/categories.interceptor';
import { CategoryInterceptor } from './interceptors/category.interceptor';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    @UseFilters(DatabaseException)
    @UseInterceptors(CategoriesInterceptor)
    async findAll(): Promise<Category[]> {
        return await this.categoriesService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseException)
    @UseInterceptors(CategoryInterceptor)
    async findOne(@Param("id", ParseIntPipe) id: number): Promise<Category> {
        return await this.categoriesService.findById(id);
    }
}
