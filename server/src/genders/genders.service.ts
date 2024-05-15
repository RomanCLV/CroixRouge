import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gender } from './gender.entity';

@Injectable()
export class GendersService {
    constructor(
        @InjectRepository(Gender)
        private readonly gendersRepository: Repository<Gender>,
    ) { }

    async findAll(): Promise<Gender[]> {
        const genders = await this.gendersRepository.find();
        if (!genders) {
            throw new NotFoundException(`genders not found.`)
        }
        return genders;
    }

    async findById(id: number): Promise<Gender> {
        const gender = await this.gendersRepository.findOneBy({ id });
        if (!gender) {
            throw new NotFoundException(`gender ${id} not found.`)
        }
        return gender;
    }

    async findByGender(gender: string): Promise<Gender> {
        const result = await this.gendersRepository.findOneBy({ gender });
        if (!result) {
            throw new NotFoundException(`gender ${gender} not found.`)
        }
        return result;
    }
}
