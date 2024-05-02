import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { DatabaseExceptionInterceptor } from 'src/database/database-exception.interceptor';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

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
