import { Body, Controller, Post, Patch, Req, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
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

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post("register")
    @UseFilters(DatabaseException)
    @UsePipes(new CreateUserPipe(createUserSchema))
    @UseInterceptors(JwtInterceptor)
    register(@Body() user: CreateUserDto): Promise<string> {
        return this.usersService.register(user);
    }

    @Post("can-register")
    @UseFilters(DatabaseException)
    @UsePipes(new CanCreateUserPipe(canCreateUserSchema))
    @UseInterceptors(BooleanInterceptor)
    canRegister(@Body() user: CanCreateUserDto): Promise<boolean> {
        return this.usersService.canRegister(user.email);
    }

    @Patch("image")
    @UseFilters(DatabaseException)
    @UsePipes(new UpdateImagePipe(updateImageSchema))
    @UseInterceptors(BooleanInterceptor)
    async updateImage(@Req() req: Request, @Body() body: UpdateImageDto): Promise<string> {
        return await this.usersService.updateImagePath(req.user, body.imagePath);
    }
}
