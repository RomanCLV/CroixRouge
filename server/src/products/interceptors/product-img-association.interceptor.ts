import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../product.entity';
import { ProductImagesProductAssociation } from '../interfaces/product-images-product-association.interface';
import { ProductImages } from 'src/product-images/product-images.entity';

@Injectable()
export class ProductImagesProductInterceptor implements NestInterceptor<ProductImagesProductAssociation> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((association: ProductImagesProductAssociation) => ({
                product: {
                    id: association.product.id,
                    title: association.product.title,
                    description: association.product.description,
                    price: association.product.price,
                    state: association.product.state,
                    city: association.product.city.name,
                    category: association.product.category.category,
                    size: association.product.size.size,
                    gender: association.product.gender.gender,
                    images: association.images.map((imageProduct: ProductImages) => imageProduct.image_path)
                }
            }))
        );
    }
}
