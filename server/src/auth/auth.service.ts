import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { LoginDto } from './DTOs/login.dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from "bcrypt";
import { UserJWTAssociation } from './interfaces/user-jwt-association.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async login(loginData: LoginDto): Promise<UserJWTAssociation> {
        const user = await this.usersRepository.findOne({where: { email: loginData.email }});
        if (user) {
            if (bcrypt.compareSync(loginData.password, user.password)) {
                const userJWT: UserJWTAssociation = {
                    user: user,
                    jwt: this.userToJWT(user)
                }
                return userJWT;
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
            email: user.email
        };
        return this.jwtService.sign(payload);
    }

}
