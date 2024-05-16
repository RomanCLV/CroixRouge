import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../cart.entity';

@Injectable()
export class CartInterceptor implements NestInterceptor<Cart> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: Cart) => ({ 
                cart: data
            }))
        );
    }
}
