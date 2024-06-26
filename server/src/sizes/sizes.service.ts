import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from './size.entity';

@Injectable()
export class SizesService {
    constructor(
        @InjectRepository(Size)
        private readonly sizesRepository: Repository<Size>,
    ) { }

    async findAll(): Promise<Size[]> {
        const sizes = await this.sizesRepository.find();
        if (!sizes) {
            throw new NotFoundException(`sizes not found.`)
        }
        return sizes;
    }

    async findById(id: number): Promise<Size> {
        const size = await this.sizesRepository.findOneBy({ id });
        if (!size) {
            throw new NotFoundException(`sze ${id} not found.`)
        }
        return size;
    }

    async findBySize(size: string): Promise<Size> {
        const result = await this.sizesRepository.findOneBy({ size });
        if (!result) {
            throw new NotFoundException(`size ${size} not found.`)
        }
        return result;
    }

}
