import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { City } from '../city.entity';

@Injectable()
export class CityInterceptor implements NestInterceptor<City[]> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((city: City) => ({
                city : {
                    name: city.name,
                    address: city.address,
                    lng: city.lng,
                    lat: city.lat,
                    imagePath: city.image_path
                }
            }))
        );
    }
}
