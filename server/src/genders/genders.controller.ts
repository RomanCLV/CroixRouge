import { Controller, Get, Param, ParseIntPipe, UseFilters } from '@nestjs/common';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { GendersService } from './genders.service';
import { Gender } from './gender.entity';

@Controller('genders')
export class GendersController {
    constructor(private readonly gendersService: GendersService) {}

    @Get()
    @UseFilters(DatabaseException)
    findAll(): Promise<Gender[]> {
        return this.gendersService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseException)
    findOne(@Param("id", ParseIntPipe) id: number): Promise<Gender> {
        return this.gendersService.findOne(id);
    }
}
