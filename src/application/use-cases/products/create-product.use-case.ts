import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateProductDto } from "src/application/dtos/products/create-product.dto";
import { Product } from "src/domain/entities/products/product.entity";
import { IProductRepository } from "src/domain/repositories/products/product-repository.interface";
import { ProductionMessageHelper } from "src/utils/message.helps";

@Injectable()
export class CreateProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private productRepository: IProductRepository,
    ) { }

    async execute(createProductDto: CreateProductDto): Promise<Product> {
        const product = Product.createProduct(createProductDto);
        const existsProductCode = await this.productRepository.findByCode(createProductDto.code);

        if (existsProductCode) {
            throw new HttpException(
                ProductionMessageHelper.EXIST_CODE,
                HttpStatus.BAD_REQUEST,
            );
        }

        const createProduct = await this.productRepository.create(product);

        return createProduct;
    }
}
