import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginDto } from './DTOs/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async login(loginData: LoginDto): Promise<string> {
        const user = await this.usersRepository.findOne({where: { email: loginData.email }});
        if (user) {
            if (bcrypt.compareSync(loginData.password, user.password)) {
                const payload = {
                    username: user.username,
                    email: user.email
                };
                return this.jwtService.sign(payload);
            }
            else {
                throw new HttpException("Invalid credentials.", HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            throw new HttpException("Invalid credentials.", HttpStatus.UNAUTHORIZED);
        }
    }
}
