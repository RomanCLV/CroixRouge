import { Body, Controller, Post, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { CreateUserPipe } from './pipes/create-user.pipe';
import { CreateUserDto, createUserSchema } from './DTOs/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { UserInterceptor } from './interceptors/user.interceptor';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UseFilters(DatabaseException)
    @UsePipes(new CreateUserPipe(createUserSchema))
    @UseInterceptors(UserInterceptor)
    create(@Body() user: CreateUserDto): Promise<User> {
        return this.usersService.create(user);
    }
}
