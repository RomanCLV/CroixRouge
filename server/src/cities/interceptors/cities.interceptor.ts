import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../city.entity';

@Injectable()
export class CitiesInterceptor implements NestInterceptor<City[]> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data: City[]) => ({ 
                categories: data.map((city: City) => ({
                    name: city.name,
                    address: city.address,
                    lng: city.lng,
                    lat: city.lat,
                    imagePath: city.image_path
                }))
            }))
        );
    }
}
