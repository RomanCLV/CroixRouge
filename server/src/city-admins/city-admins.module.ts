import { Module } from '@nestjs/common';
import { CityAdminsController } from './city-admins.controller';
import { CityAdminsService } from './city-admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityAdmin } from './city-admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityAdmin])],
  controllers: [CityAdminsController],
  providers: [CityAdminsService],
  exports: [CityAdminsService]
})
export class CityAdminsModule { }
