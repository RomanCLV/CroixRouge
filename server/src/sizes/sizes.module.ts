import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SizesController } from './sizes.controller';
import { SizesService } from './sizes.service';
import { Size } from './size.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  controllers: [SizesController],
  providers: [SizesService]
})
export class SizesModule {}
