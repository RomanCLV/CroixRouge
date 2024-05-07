import { Controller, Get, Param, ParseIntPipe, UseFilters, UseInterceptors } from '@nestjs/common';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CategoriesInterceptor } from './interceptors/categories.interceptor';
import { CategoryInterceptor } from './interceptors/category.interceptor';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @UseFilters(DatabaseException)
    @UseInterceptors(CategoriesInterceptor)
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseException)
    @UseInterceptors(CategoryInterceptor)
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Category> {
        return this.categoriesService.findOne(id);
    }
}
