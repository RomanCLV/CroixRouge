import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @UseFilters(DatabaseException)
    findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseException)
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Category> {
        return this.categoriesService.findOne(id);
    }
}
