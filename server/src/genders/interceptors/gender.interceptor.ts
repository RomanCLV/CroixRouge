import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gender } from '../gender.entity';

@Injectable()
export class GenderInterceptor implements NestInterceptor<Gender> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: Gender) => ({ 
                gender: data.gender 
            }))
        );
    }
}
