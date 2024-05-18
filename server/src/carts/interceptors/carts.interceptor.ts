import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart } from '../cart.entity';

@Injectable()
export class CartsInterceptor implements NestInterceptor<Cart[]> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: Cart[]) => ({ 
                products: data.map((data: Cart) => {
                    const product: any = data.product;
                    product.city = product.city.name;
                    product.category = product.category.category;
                    product.gender = product.gender.gender;
                    product.size = product.size.size;
                    return product;
                })
            }))
        );
    }
}
