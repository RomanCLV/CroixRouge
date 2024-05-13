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

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([City]),
    TypeOrmModule.forFeature([CityAdmin]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [UsersService, CitiesService, CityAdminsService]
})
export class UsersModule { }
