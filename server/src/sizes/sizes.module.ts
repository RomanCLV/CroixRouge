import { Module } from '@nestjs/common';
import { SizesController } from './sizes.controller';
import { SizesService } from './sizes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from 'src/DTOs/size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  controllers: [SizesController],
  providers: [SizesService]
})
export class SizesModule {}
