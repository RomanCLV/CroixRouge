import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTOs/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOne({ where: { email: email } })
    }

    async create(user: CreateUserDto): Promise<User> {
        if (await this.findByEmail(user.email)) {
           throw new HttpException("Email already used", HttpStatus.BAD_REQUEST);
        }
        else {
            user.password = await this.cryptePassword(user.password);
            const newUser = this.usersRepository.create(user);
            if (!newUser) {
                throw new HttpException("User not created", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return await this.usersRepository.save(newUser);
        }
    }

    private async cryptePassword(password: string) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
}
