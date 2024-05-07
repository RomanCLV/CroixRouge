import { Controller, Get, Param, ParseIntPipe, UseFilters, UseInterceptors } from '@nestjs/common';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { GendersService } from './genders.service';
import { Gender } from './gender.entity';
import { GendersInterceptor } from './interceptors/genders.interceptor';
import { GenderInterceptor } from './interceptors/gender.interceptor';

@Controller('genders')
export class GendersController {
    constructor(private readonly gendersService: GendersService) {}

    @Get()
    @UseFilters(DatabaseException)
    @UseInterceptors(GendersInterceptor)
    findAll(): Promise<Gender[]> {
        return this.gendersService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseException)
    @UseInterceptors(GenderInterceptor)
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Gender> {
        return this.gendersService.findOne(id);
    }
}
