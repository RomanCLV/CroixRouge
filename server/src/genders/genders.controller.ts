import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { DatabaseExceptionInterceptor } from 'src/database/database-exception.interceptor';
import { GendersService } from './genders.service';
import { Gender } from './gender.entity';

@Controller('genders')
export class GendersController {
    constructor(private readonly gendersService: GendersService) {}

    @Get()
    @UseFilters(DatabaseExceptionInterceptor)
    findAll(): Promise<Gender[]> {
        return this.gendersService.findAll();
    }

    @Get(":id")
    @UseFilters(DatabaseExceptionInterceptor)
    findOne(@Param("id") id: string): Promise<Gender | null> {
        return this.gendersService.findOne(+id);
    }
}
