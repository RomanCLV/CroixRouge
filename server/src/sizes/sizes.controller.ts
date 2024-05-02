import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { DatabaseExceptionInterceptor } from 'src/database/database-exception.interceptor';
import { SizesService } from './sizes.service';
import { Size } from './size.entity';

@Controller('sizes')
export class SizesController {
    constructor(private readonly sizesService: SizesService) {}

    @Get()
    @UseFilters(DatabaseExceptionInterceptor)
    findAll(): Promise<Size[]> {
        return this.sizesService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseExceptionInterceptor)
    findOne(@Param("id") id: string): Promise<Size | null> {
        return this.sizesService.findOne(+id);
    }
}
