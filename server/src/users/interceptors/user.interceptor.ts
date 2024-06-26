import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user.entity';

@Injectable()
export class UserInterceptor implements NestInterceptor<User> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((user: User) => ({ 
                user: {
                    username: user.username,
                    email: user.email,
                    imagePath: user.image_path,
                    creationDate: user.creation_date
                }
            }))
        );
    }
}
