import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Gender } from './gender.entity';

@Injectable()
export class GendersService {
    constructor(
        @InjectRepository(Gender)
        private gendersRepository: Repository<Gender>,
      ) {}

    async findAll(): Promise<Gender[]> {
        try {
            return await this.gendersRepository.find();
        }
        catch (error) 
        {
            if (error instanceof QueryFailedError) {
                throw new NotFoundException("Impossible de trouver les genres.");
            } 
            else {
                throw error;
            }
        }
    }
    
    async findOne(id: number): Promise<Gender | null> {
        try {
            return this.gendersRepository.findOneBy({ id });
        } 
        catch (error) {
            if (error instanceof QueryFailedError) {
                throw new NotFoundException("Impossible de trouver le genre d'index: " + id);
            } 
            else {
                throw error;
            }
        }
    }
}
