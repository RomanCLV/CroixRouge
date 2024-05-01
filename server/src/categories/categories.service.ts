import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Category } from 'src/DTOs/category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
      ) {}
    

    async findAll(): Promise<Category[]> {
        try {
            return await this.categoriesRepository.find();
        }
        catch (error) 
        {
            if (error instanceof QueryFailedError) {
                throw new NotFoundException("Impossible de trouver les catégories.");
            } 
            else if (error instanceof AggregateError) {
                throw new NotFoundException("Impossible de communiquer avec la base de données.");
            }
            else {
                throw error;
            }
        }
    }
    
    async findOne(id: number): Promise<Category | null> {
        try {
            return this.categoriesRepository.findOneBy({ id });
        } 
        catch (error) {
            if (error instanceof QueryFailedError) {
                throw new NotFoundException("Impossible de trouver la catégorie d'index: " + id);
            } 
            else if (error instanceof AggregateError) {
                throw new NotFoundException("Impossible de communiquer avec la base de données.");
            }
            else {
                throw error;
            }
        }
    }
}
