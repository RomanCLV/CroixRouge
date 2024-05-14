import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';
import { CreateCityDto } from './DTOs/create-city.dto';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private readonly citiesRepository: Repository<City>
    ) { }

    async findCities(limit?: number, name?: string): Promise<City[]> {
        let queryBuilder = this.citiesRepository.createQueryBuilder('city');
        if (name) {
            queryBuilder = queryBuilder.where("city.name LIKE :name", { name: `%${name}%` });
        }
        if (limit != null && limit > 0) {
            queryBuilder = queryBuilder.take(limit);
        }
        return await queryBuilder.getMany();
    }

    async findCoordinates(): Promise<City[]> {
        return await this.citiesRepository.find();
    }

    async findCityByName(name: string): Promise<City> {
        return await this.citiesRepository.findOne({ where: { name: name } })
    }

    async createCity(body: CreateCityDto) {
        const cityToSave = this.citiesRepository.create({
            name: body.name,
            address: body.address,
            lat: body.latitude,
            lng: body.longitude,
            image_path: body.image,
        });
        if (cityToSave) {
            const savedCity = await this.citiesRepository.save(cityToSave);
            if (savedCity) {
                return savedCity;
            }
            else {
                throw new HttpException("City not saved.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else {
            throw new HttpException("City not created.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
} 
