import { Body, Controller, Post, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { LoginPipe } from './pipes/LoginPipe.pipe';
import { LoginDto, loginSchema } from './DTOs/login.dto';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { UserInterceptor } from 'src/users/interceptors/user.interceptor';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
import { UserJWTAssociation } from './interfaces/user-jwt-association.interface';
import { UserJWTInterceptor } from './interceptors/user-jwt.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @UsePipes(new LoginPipe(loginSchema))
    @UseFilters(DatabaseException)
    @UseInterceptors(UserJWTInterceptor)
    async login(@Body() user: LoginDto): Promise<UserJWTAssociation> {
        return await this.authService.login(user);
    }
}
