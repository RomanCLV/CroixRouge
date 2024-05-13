import { Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CityAdminsService } from 'src/city-admins/city-admins.service';
import { CitiesService } from 'src/cities/cities.service';
import { City } from 'src/cities/city.entity';
import { CityAdmin } from 'src/city-admins/city-admin.entity';
import { SuperAdmin } from 'src/super-admins/super-admin.entity';
import { SuperAdminsService } from 'src/super-admins/super-admins.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([CityAdmin]),
    TypeOrmModule.forFeature([SuperAdmin]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService, CitiesService, CityAdminsService, SuperAdminsService]
})
export class UsersModule { }
