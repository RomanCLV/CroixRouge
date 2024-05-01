import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { Category } from 'src/DTOs/category.entity';
import { CategoriesService } from './categories.service';
import { DatabaseExceptionInterceptor } from 'src/database/database-exception.interceptor';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @UseFilters(DatabaseExceptionInterceptor)
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseExceptionInterceptor)
    findOne(@Param("id") id: string): Promise<Category | null> {
        return this.categoriesService.findOne(+id);
    }
}
