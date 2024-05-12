import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../city.entity';

@Injectable()
export class CitiesCoordinatesInterceptor implements NestInterceptor<City[]> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: City[]) => ({ 
                coordinates: data.map((city: City) => ({
                    name: city.name,
                    lng: city.lng,
                    lat: city.lat
                }))
            }))
        );
    }
}
