import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
      ) {}
    

    async findAll(): Promise<Category[]> {
        const categories = await this.categoriesRepository.find();
        if (!categories) {
            throw new NotFoundException(`categories not found.`)
        }
        return categories;
    }

    async findByCategory(category: string): Promise<Category> {
        const cat = await this.categoriesRepository.findOne({ where: {category}});
        if (!cat) {
            throw new NotFoundException(`category ${category} not found.`)
        }
        return cat;
    }
    
    async findOne(id: number): Promise<Category> {
        const category = await this.categoriesRepository.findOneBy({ id });
        if (!category) {
            throw new NotFoundException(`category ${id} not found.`)
        }
        return category;
    }
}
