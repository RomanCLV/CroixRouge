import { Body, Controller, Get, NotFoundException, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { City } from './city.entity';
import { CitiesInterceptor } from './interceptors/cities.interceptor';
import { CitiesPipe } from './pipes/cities.pipe';
import { CitiesDto, citiesSchema } from './DTOs/cities.dto';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) { }

    @Get()
    @UseFilters(DatabaseException)
    @UseInterceptors(CitiesInterceptor)
    @UsePipes(new CitiesPipe(citiesSchema))
    findAll(@Body() body: CitiesDto): Promise<City[]> {
        const cities = this.citiesService.findAll(body.limit, body.name);
        if (!cities) {
            throw new NotFoundException(`cities not found.`)
        }
        return cities;
    }
}
