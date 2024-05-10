import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserJWTAssociation } from '../interfaces/user-jwt-association.interface';

@Injectable()
export class UserJWTInterceptor implements NestInterceptor<UserJWTAssociation> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: UserJWTAssociation) => ({ 
                user: {
                    username: data.user.username,
                    email: data.user.email,
                    creationDate: data.user.creation_date
                },
                jwt: data.jwt
            }))
        );
    }
}
