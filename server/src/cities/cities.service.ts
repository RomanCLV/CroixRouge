import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private readonly citiesRepository: Repository<City>
    ) {}

    async findAll(limit?: number): Promise<City[]> {
        return limit != null ?
            await this.citiesRepository.find({ take: limit }) :
            await this.citiesRepository.find();
    }
}
