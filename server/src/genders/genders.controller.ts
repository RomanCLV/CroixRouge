import { Controller, Get, Param, ParseIntPipe, UseFilters, UseInterceptors } from '@nestjs/common';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { GendersService } from './genders.service';
import { Gender } from './gender.entity';
import { GendersInterceptor } from './interceptors/genders.interceptor';
import { GenderInterceptor } from './interceptors/gender.interceptor';

@Controller('genders')
export class GendersController {
    constructor(private readonly gendersService: GendersService) { }

    @Get()
    @UseFilters(DatabaseException)
    @UseInterceptors(GendersInterceptor)
    async findAll(): Promise<Gender[]> {
        return await this.gendersService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseException)
    @UseInterceptors(GenderInterceptor)
    async findOne(@Param("id", ParseIntPipe) id: number): Promise<Gender> {
        return await this.gendersService.findById(id);
    }
}
