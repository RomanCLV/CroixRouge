import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { Size } from 'src/DTOs/size.entity';
import { SizesService } from './sizes.service';
import { DatabaseExceptionInterceptor } from 'src/database/database-exception.interceptor';

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
