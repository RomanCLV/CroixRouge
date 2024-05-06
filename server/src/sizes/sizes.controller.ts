import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { SizesService } from './sizes.service';
import { Size } from './size.entity';

@Controller('sizes')
export class SizesController {
    constructor(private readonly sizesService: SizesService) {}

    @Get()
    @UseFilters(DatabaseException)
    findAll(): Promise<Size[]> {
        return this.sizesService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseException)
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Size> {
        return this.sizesService.findOne(id);
    }
}
