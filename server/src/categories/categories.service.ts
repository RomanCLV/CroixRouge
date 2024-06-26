import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) { }


    async findAll(): Promise<Category[]> {
        const categories = await this.categoriesRepository.find();
        if (!categories) {
            throw new NotFoundException(`categories not found.`)
        }
        return categories;
    }

    async findById(id: number): Promise<Category> {
        const category = await this.categoriesRepository.findOneBy({ id });
        if (!category) {
            throw new NotFoundException(`category ${id} not found.`)
        }
        return category;
    }

    async findByCategory(category: string): Promise<Category> {
        const result = await this.categoriesRepository.findOneBy({ category: category });
        if (!result) {
            throw new NotFoundException(`category ${category} not found.`)
        }
        return result;
    }
}
