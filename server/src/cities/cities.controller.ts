import { Body, Controller, Get, NotFoundException, Param, Post, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { City } from './city.entity';
import { CitiesInterceptor } from './interceptors/cities.interceptor';
import { CitiesPipe } from './pipes/cities.pipe';
import { CitiesDto, citiesSchema } from './DTOs/cities.dto';
import { CitiesCoordinatesInterceptor } from './interceptors/coordinates.interceptor';
import { CityInterceptor } from './interceptors/city.interceptor';
import { GetCityDto, getCitySchema } from './DTOs/get-city.dto';
import { GetCityPipe } from './pipes/get-city.pipe';
import { CreateCityPipe } from './pipes/create-city.pipe';
import { CreateCityDto, createCitySchema } from './DTOs/create-city.dto';

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

    @Get("city/:city")
    @UseFilters(DatabaseException)
    @UseInterceptors(CityInterceptor)
    //@UsePipes(new GetCityPipe(getCitySchema))
    async findCityByName(@Param("city") city: string): Promise<City> {
        return await this.citiesService.findCityByName(city);
    }

    @Post("city")
    @UseFilters(DatabaseException)
    @UsePipes(new CreateCityPipe(createCitySchema))
    @UseInterceptors(CityInterceptor)
    async createCity(@Body() body: CreateCityDto) {
        return await this.citiesService.createCity(body);
    }
}
