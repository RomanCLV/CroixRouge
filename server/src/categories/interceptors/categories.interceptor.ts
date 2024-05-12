import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../category.entity';

@Injectable()
export class CategoriesInterceptor implements NestInterceptor<Category[]> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((categories: Category[]) => ({ 
                categories: categories.map((category: Category) => category.category)  
            }))
        );
    }
}
