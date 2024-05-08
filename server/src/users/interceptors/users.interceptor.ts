import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user.entity';

@Injectable()
export class UsersInterceptor implements NestInterceptor<User[]> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: User[]) => ({ 
                users: data.map(user => ({
                    username: user.username
                }))  
            }))
        );
    }
}
