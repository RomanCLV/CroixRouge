import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuperAdmin } from './super-admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuperAdminsService {
    constructor(
        @InjectRepository(SuperAdmin)
        private readonly superAdminsRepository: Repository<SuperAdmin>) {
        }

    async isSuperAdmin(userId: number) : Promise<boolean> {
        const line = await this.superAdminsRepository.findOne({where: {user: {id: userId}}});
        return line !== null;
    }
}
