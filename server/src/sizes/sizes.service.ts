import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Size } from 'src/DTOs/size.entity';

@Injectable()
export class SizesService {
    constructor(
        @InjectRepository(Size)
        private sizesRepository: Repository<Size>,
      ) {}

    async findAll(): Promise<Size[]> {
        try {
            return await this.sizesRepository.find();
        }
        catch (error) 
        {
            if (error instanceof QueryFailedError) {
                throw new NotFoundException("Impossible de trouver les tailles.");
            } 
            else {
                throw error;
            }
        }
    }
    
    async findOne(id: number): Promise<Size | null> {
        try {
            return this.sizesRepository.findOneBy({ id });
        } 
        catch (error) {
            if (error instanceof QueryFailedError) {
                throw new NotFoundException("Impossible de trouver la taille d'index: " + id);
            } 
            else {
                throw error;
            }
        }
    }
}
