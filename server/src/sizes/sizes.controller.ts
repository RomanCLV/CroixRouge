import { Controller, Get, Param, ParseIntPipe, UseFilters, UseInterceptors } from '@nestjs/common';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { SizesService } from './sizes.service';
import { Size } from './size.entity';
import { SizesInterceptor } from './interceptors/sizes.interceptor';
import { SizeInterceptor } from './interceptors/size.interceptor';

@Controller('sizes')
export class SizesController {
    constructor(private readonly sizesService: SizesService) { }

    @Get()
    @UseFilters(DatabaseException)
    @UseInterceptors(SizesInterceptor)
    async findAll(): Promise<Size[]> {
        return await this.sizesService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseException)
    @UseInterceptors(SizeInterceptor)
    async findOne(@Param("id", ParseIntPipe) id: number): Promise<Size> {
        return await this.sizesService.findById(id);
    }
}
