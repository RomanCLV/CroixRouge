import { Body, Controller, Get, Post, Req, UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { DatabaseException } from 'src/filters/databaseException.filter';
import { CreateCartPipe } from './pipes/create-carte.pipe';
import { CreateCartDto, createCartSchema } from './DTOs/create-cart.dto';
import { CartsService } from './carts.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';

@Controller('carts')
export class CartsController {
    constructor (private readonly cartsService: CartsService) { }

    @Post()
    @UseFilters(DatabaseException)
    @UsePipes(new CreateCartPipe(createCartSchema))
    @UseGuards(JwtGuard)
    createCart(@Req() req: Request, @Body() body: CreateCartDto) {
        this.cartsService.createCart(req.user, body.productId);
    }

    @Get()
    @UseFilters(DatabaseException)
    @UseGuards(JwtGuard)
    @UseInterceptors()
    async getCartsOfUser(@Req() req: Request) {
        const carts = await this.cartsService.getCartOfUser(req.user);
        return carts;
    }
}
