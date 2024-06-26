import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gender } from '../gender.entity';

@Injectable()
export class GendersInterceptor implements NestInterceptor<Gender[]> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((genders: Gender[]) => ({ 
                genders: genders.map((gender: Gender) => gender.gender)  
            }))
        );
    }
}
