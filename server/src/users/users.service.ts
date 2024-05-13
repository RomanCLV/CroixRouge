import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTOs/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @Inject(AuthService)
        private readonly authService: AuthService,
    ) {}

    private validateEmail(email: string) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null;
    }

    async findByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({ where: { email: email } })
    }

    async register(user: CreateUserDto): Promise<string> {
        if (await this.canRegister(user.email)) {
            const hashedPassword = bcrypt.hashSync(user.password, 10);
            const newUser = this.usersRepository.create({
                username: user.username,
                email: user.email,
                password: hashedPassword,
                image_path: user.imagePath
            });
            if (!newUser) {
                throw new HttpException("User not created.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const result = await this.usersRepository.save(newUser);
            if (result) {
                return this.authService.userToJWT(result);
            }
            else {
                throw new HttpException("User not saved.", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        else {
            throw new HttpException("Email already used.", HttpStatus.NOT_ACCEPTABLE);
        }
    }

    async canRegister(email: string): Promise<boolean> {
        if (!this.validateEmail(email)) {
            throw new HttpException("Invalid email.", HttpStatus.NOT_ACCEPTABLE);
        }
        return await this.findByEmail(email) === null;
    }
}
