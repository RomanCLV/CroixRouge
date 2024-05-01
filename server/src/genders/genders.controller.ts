import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { Gender } from 'src/DTOs/gender.entity';
import { GendersService } from './genders.service';
import { DatabaseExceptionInterceptor } from 'src/database/database-exception.interceptor';

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
