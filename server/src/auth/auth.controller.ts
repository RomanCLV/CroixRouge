import { Controller, Get, Post, Req, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { LoginPipe } from './pipes/login.pipe';
import { loginSchema } from './DTOs/login.dto';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("login")
    @UseGuards(LocalGuard)
    @UsePipes(new LoginPipe(loginSchema))
    @UseFilters(DatabaseException)
    @UseInterceptors(JwtInterceptor)
    login(@Req() req: Request) {
        return req.user;
    }

    @Get("status")
    @UseGuards(JwtGuard)
    @UseFilters(DatabaseException)
    async status(@Req() req: Request) {
        const update = await this.authService.updateStatus(req.user);
        return {
            user: {
                username: update.user.username,
                email: update.user.email,
                imagePath: update.user.image_path,
                creationDate: update.user.creation_date,
            },
            jwt: update.jwt
        };
    }
}
