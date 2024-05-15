import { ProductImages } from "src/product-images/product-images.entity";
import { Product } from "../product.entity";

export interface ProductImagesProductAssociation {
    product: Product,
    images: ProductImages[]
}
