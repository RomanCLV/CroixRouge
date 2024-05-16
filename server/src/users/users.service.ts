import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './DTOs/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { AuthService } from 'src/auth/auth.service';
import { CitiesService } from 'src/cities/cities.service';
import { CityAdminsService } from 'src/city-admins/city-admins.service';
import { SuperAdminsService } from 'src/super-admins/super-admins.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @Inject(AuthService)
        private readonly authService: AuthService,
        @Inject(CitiesService)
        private readonly citiesService: CitiesService,
        @Inject(CityAdminsService)
        private readonly cityAdminsService: CityAdminsService,
        @Inject(SuperAdminsService)
        private readonly superAdminsService: SuperAdminsService
    ) { }

    private validateEmail(email: string) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null;
    }

    async findById(userId: number): Promise<User> {
        return await this.usersRepository.findOneBy({id: userId});
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

    async updateImagePath(user: any, imagePath: string): Promise<string> {
        const fullUser = await this.findByEmail(user.email);
        if (fullUser) {
            fullUser.image_path = imagePath;
            await this.usersRepository.save(fullUser);
            return fullUser.image_path;
        }
        else {
            throw new NotFoundException("User " + user.email + " not found.");
        }
    }

    async isAdmin(user: any, city: string): Promise<boolean> {
        if (await this.isSuperAdmin(user)) {
            return true;
        }
        const fullUser = await this.findByEmail(user.email);
        if (fullUser) {
            const fullCity = await this.citiesService.findCityByName(city);
            if (fullCity) {
                return await this.cityAdminsService.find(fullUser.id, fullCity.id);
            }
            else {
                throw new NotFoundException("city " + city + " not found");
            }
        }
        else {
            throw new NotFoundException("user" + user.email + " not found");
        }
    }

    async isSuperAdmin(user: any): Promise<boolean> {
        const fullUser = await this.findByEmail(user.email);
        if (fullUser) {
            return await this.superAdminsService.isSuperAdmin(fullUser.id);
        }
        else {
            throw new NotFoundException("user" + user.email + " not found");
        }
    }
}
