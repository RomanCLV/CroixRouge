import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CityAdmin } from './city-admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityAdminsService {
    constructor(
        @InjectRepository(CityAdmin)
        private readonly cityAdminsRepository: Repository<CityAdmin>,
    ) { }

    async find(userId: number, cityId: number): Promise<boolean> {
        console.log("find: city:", cityId, "user:", userId);
        const line = await this.cityAdminsRepository
            .createQueryBuilder("city_admins")
            .where("user_id = :userId", { userId })
            .andWhere("city_id = :cityId", { cityId })
            .getOne();
        return line !== null;
    }
}
