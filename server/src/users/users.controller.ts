import { Body, Controller, Get, Inject, Param, Patch, Post, Req, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { CreateUserDto, createUserSchema } from './DTOs/create-user.dto';
import { CanCreateUserDto, canCreateUserSchema } from './DTOs/can-create-user.dto';
import { UsersService } from './users.service';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { CanCreateUserPipe } from './pipes/can-create-user.pipe';
import { BooleanInterceptor } from 'src/interceptors/boolean.interceptor';
import { JwtInterceptor } from 'src/auth/interceptors/jwt.interceptor';
import { UpdateImagePipe } from './pipes/update-image.pipe';
import { UpdateImageDto, updateImageSchema } from './DTOs/update-image.dto';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { IsAdminPipe } from './pipes/is-admin.pipe';
import { IsAdminDto, isAdminSchema } from './DTOs/is-admin.tdo';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post("register")
    @UseFilters(DatabaseException)
    @UsePipes(new CreateUserPipe(createUserSchema))
    @UseInterceptors(JwtInterceptor)
    async register(@Body() user: CreateUserDto): Promise<string> {
        return await this.usersService.register(user);
    }

    @Post("can-register")
    @UseFilters(DatabaseException)
    @UsePipes(new CanCreateUserPipe(canCreateUserSchema))
    @UseInterceptors(BooleanInterceptor)
    async canRegister(@Body() user: CanCreateUserDto): Promise<boolean> {
        return await this.usersService.canRegister(user.email);
    }

    @Get("is-admin/:city")
    @UseFilters(DatabaseException)
    @UseGuards(JwtGuard)
    @UseInterceptors(BooleanInterceptor)
    async isAdmin(@Req() req: Request, @Param("city") city: string) {
        return await this.usersService.isAdmin(req.user, city);
    }

    @Get("is-super-admin")
    @UseFilters(DatabaseException)
    @UseGuards(JwtGuard)
    @UseInterceptors(BooleanInterceptor)
    async isSuperAdmin(@Req() req: Request, @Body() body: IsAdminDto) {
        return await this.usersService.isSuperAdmin(req.user);
    }

    @Patch("image")
    @UseFilters(DatabaseException)
    @UsePipes(new UpdateImagePipe(updateImageSchema))
    @UseInterceptors(BooleanInterceptor)
    async updateImage(@Req() req: Request, @Body() body: UpdateImageDto): Promise<string> {
        return await this.usersService.updateImagePath(req.user, body.imagePath);
    }
}
