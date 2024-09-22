import { Product } from "src/domain/entities/products/product.entity";

export interface PaginatedProductDTO {
    products: Product[];
    total: number;
    currentPage: number;
    nextPage: number;
    prevPage: number;
    lastPage: number;
}
