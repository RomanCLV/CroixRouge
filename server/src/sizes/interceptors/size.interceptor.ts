import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Size } from '../size.entity';

@Injectable()
export class SizeInterceptor implements NestInterceptor<Size> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: Size) => ({ 
                size: data.size 
            }))
        );
    }
}
