import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTOs/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
const bcrypt = require("bcrypt")

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
            user.password = bcrypt.hashSync(user.password, 10);
            const newUser = this.usersRepository.create(user);
            if (!newUser) {
                throw new HttpException("User not created", HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return await this.usersRepository.save(newUser);
        }
    }
}
