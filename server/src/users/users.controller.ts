import { Body, Controller, Post, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { CreateUserDto, createUserSchema } from './DTOs/create-user.dto';
import { CanCreateUserDto, canCreateUserSchema } from './DTOs/can-create-user.dto';
import { UsersService } from './users.service';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { CanCreateUserPipe } from './pipes/can-create-user.pipe';
import { BooleanInterceptor } from 'src/interceptors/boolean.interceptor';
import { UserJWTAssociation } from 'src/auth/interfaces/user-jwt-association.interface';
import { UserJWTInterceptor } from 'src/auth/interceptors/user-jwt.interceptor';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post("register")
    @UseFilters(DatabaseException)
    @UsePipes(new CreateUserPipe(createUserSchema))
    @UseInterceptors(UserJWTInterceptor)
    register(@Body() user: CreateUserDto): Promise<UserJWTAssociation> {
        return this.usersService.register(user);
    }

    @Post("can-register")
    @UseFilters(DatabaseException)
    @UsePipes(new CanCreateUserPipe(canCreateUserSchema))
    @UseInterceptors(BooleanInterceptor)
    canRegister(@Body() user: CanCreateUserDto): Promise<boolean> {
        return this.usersService.canRegister(user.email);
    }
}
