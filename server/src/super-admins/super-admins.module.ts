import { Module } from '@nestjs/common';
import { SuperAdminsController } from './super-admins.controller';
import { SuperAdminsService } from './super-admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuperAdmin } from './super-admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SuperAdmin])],
  controllers: [SuperAdminsController],
  providers: [SuperAdminsService],
  exports: [SuperAdminsService]
})
export class SuperAdminsModule {}
