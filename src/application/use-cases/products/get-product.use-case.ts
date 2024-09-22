import { Inject, Injectable } from '@nestjs/common';
import { PaginatedProductDTO } from 'src/application/dtos/products/paginated-product.dto';
import { IProductRepository } from 'src/domain/repositories/products/product-repository.interface';
import { getParametersToPaginate, PaginatedData, paginateResponse } from 'src/utils/pagination';

@Injectable()
export class GetProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private productRepository: IProductRepository,
    ) { }

    private async getValuesInProducts(value: string, { skip, take, page }: PaginatedData) {
        const productSearch = await this.productRepository.findFilteredProductsWithPagination(value, { skip, take, page });

        if (!productSearch) {
            return { products: [], total: 0, page, take };
        }
        const { products, total } = productSearch;
        const goal = paginateResponse({ total, page, take });
        return { products, ...goal };
    }

    private async getAllProductsPaginated({ skip, take, page }: PaginatedData) {

        const { products, total } = await this.productRepository.findAllProductsWithPagination({ skip, take, page });
        const goal = paginateResponse({ total, page, take });

        return { products, ...goal };
    }

    public async getProducts(value: string, pageNumber: number): Promise<PaginatedProductDTO> {

        const { skip, take, page } = getParametersToPaginate(pageNumber);
        let getProducts: any;
        if (!value) {
            getProducts = await this.getAllProductsPaginated({ page, skip, take });
        }
        if (value) {
            getProducts = await this.getValuesInProducts(value, { page, skip, take });
        }
        return getProducts;
    }



}