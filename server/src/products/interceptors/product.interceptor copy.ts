import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../product.entity';

@Injectable()
export class ProductInterceptor implements NestInterceptor<Product> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((product: Product) => ({
                product: {
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    state: product.state,
                    city: product.city.name,
                    category: product.category.category,
                    size: product.size.size,
                    gender: product.gender.gender
                }
            }))
        );
    }
}
