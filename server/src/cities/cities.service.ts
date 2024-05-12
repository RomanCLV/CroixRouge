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

    async findAll(limit?: number, name?: string): Promise<City[]> {
        let queryBuilder = this.citiesRepository.createQueryBuilder('city');

        if (name) {
            queryBuilder = queryBuilder.where("city.name LIKE :name", { name: `%${name}%` });
        }

        if (limit != null && limit > 0) {
            queryBuilder = queryBuilder.take(limit);
        }

        return await queryBuilder.getMany();
    }
}
