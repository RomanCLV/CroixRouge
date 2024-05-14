import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginDto } from './DTOs/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from "bcrypt";
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    async login(loginData: LoginDto): Promise<string> {
        const user = await this.usersRepository.findOne({where: { email: loginData.username }});
        if (user) {
            if (bcrypt.compareSync(loginData.password, user.password)) {
                return this.userToJWT(user);
            }
            else {
                throw new HttpException("Invalid credentials.", HttpStatus.UNAUTHORIZED);
            }
        }
        else {
            throw new HttpException("Invalid credentials.", HttpStatus.UNAUTHORIZED);
        }
    }

    userToJWT(user: User): string {
        const payload = {
            username: user.username,
            email: user.email,
            imagePath: user.image_path
        };
        return this.jwtService.sign(payload);
    }

    async updateStatus(user: any): Promise<any> {
        const fullUser = await this.usersRepository.findOneBy({email: user.email});
        if (fullUser) {
            return {
                jwt: this.userToJWT(fullUser),
                user: fullUser
            };
        }
        else {
            throw new NotFoundException("user " + user.email + " not found")
        }
    }
}
