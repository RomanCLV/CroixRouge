import { Body, Controller, Post, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { LoginPipe } from './pipes/LoginPipe.pipe';
import { LoginDto, loginSchema } from './DTOs/login.dto';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { UserInterceptor } from 'src/users/interceptors/user.interceptor';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @UsePipes(new LoginPipe(loginSchema))
    @UseFilters(DatabaseException)
    login(@Body() user: LoginDto): Promise<string> {
        return this.authService.login(user);
    }
}
