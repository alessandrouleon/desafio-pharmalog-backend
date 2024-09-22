import { CreateProductDto } from 'src/application/dtos/products/create-product.dto';
import { Product } from 'src/domain/entities/products/product.entity';
import { PaginatedData } from 'src/utils/pagination';

export interface IProductReturnWithPagination {
    products: Product[];
    total: number;
}

export interface IProductRepository {
    create(product: CreateProductDto): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findByCode(code: string): Promise<Product | null>;
    update(id: string, product: Partial<Product>): Promise<Product | null>;
    delete(id: string, product: Product): Promise<void>;
    findFilteredProductsWithPagination(
        value: string,
        parametersToPaginate: PaginatedData,
    ): Promise<IProductReturnWithPagination>;
    findAllProductsWithPagination(
        parametersToPaginate: PaginatedData,
    ): Promise<IProductReturnWithPagination>;
}
