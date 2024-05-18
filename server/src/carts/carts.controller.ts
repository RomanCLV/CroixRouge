import { Body, Controller, Delete, Get, Post, Req, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { CreateCartPipe } from './pipes/create-carte.pipe';
import { CreateCartDto, createCartSchema } from './DTOs/create-cart.dto';
import { CartsService } from './carts.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { CartInterceptor } from './interceptors/cart.interceptor';
import { CartsInterceptor } from './interceptors/carts.interceptor';
import { BooleanInterceptor } from 'src/interceptors/boolean.interceptor';

@Controller('carts')
export class CartsController {
    constructor (private readonly cartsService: CartsService) { }

    @Post()
    @UseFilters(DatabaseException)
    @UsePipes(new CreateCartPipe(createCartSchema))
    @UseGuards(JwtGuard)
    @UseInterceptors(CartInterceptor)
    async createCart(@Req() req: Request, @Body() body: CreateCartDto) {
        return await this.cartsService.createCart(req.user, body.productId);
    }

    @Get()
    @UseFilters(DatabaseException)
    @UseGuards(JwtGuard)
    @UseInterceptors(CartsInterceptor)
    async getCartsOfUser(@Req() req: Request) {
        return await this.cartsService.getCartOfUser(req.user);
    }

    @Delete()
    @UsePipes(new CreateCartPipe(createCartSchema))
    @UseFilters(DatabaseException)
    @UseGuards(JwtGuard)
    @UseInterceptors(BooleanInterceptor)
    async deleteCart(@Req() req: Request, @Body() body: CreateCartDto) {
        return await this.cartsService.deleteCart(req.user, body.productId);
    }

    @Delete("user")
    @UseFilters(DatabaseException)
    @UseGuards(JwtGuard)
    @UseInterceptors(BooleanInterceptor)
    async deleteCartOfUser(@Req() req: Request, @Body() body: CreateCartDto) {
        return await this.cartsService.deleteCartOfUser(req.user);
    }
}
