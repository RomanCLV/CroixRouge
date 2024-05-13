import { Body, Controller, Get, NotFoundException, Post, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { City } from './city.entity';
import { CitiesInterceptor } from './interceptors/cities.interceptor';
import { CitiesPipe } from './pipes/cities.pipe';
import { CitiesDto, citiesSchema } from './DTOs/cities.dto';
import { CitiesCoordinatesInterceptor } from './interceptors/coordinates.interceptor';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) { }

    @Post()
    @UseFilters(DatabaseException)
    @UseInterceptors(CitiesInterceptor)
    @UsePipes(new CitiesPipe(citiesSchema))
    async findCities(@Body() body: CitiesDto): Promise<City[]> {
        const cities = await this.citiesService.findCities(body.limit, body.name);
        if (!cities) {
            throw new NotFoundException(`cities not found.`)
        }
        return cities;
    }

    @Get("coordinates")
    @UseFilters(DatabaseException)
    @UseInterceptors(CitiesCoordinatesInterceptor)
    async findCoordinates(): Promise<City[]> {
        const cities = await this.citiesService.findCoordinates();
        if (!cities) {
            throw new NotFoundException(`cities not found.`)
        }
        return cities;
    }
}
