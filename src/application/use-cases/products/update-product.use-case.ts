import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { UpdateProductDto } from "src/application/dtos/products/update-product.dto";
import { Product } from "src/domain/entities/products/product.entity";
import { IProductRepository } from "src/domain/repositories/products/product-repository.interface";
import { ProductionMessageHelper } from "src/utils/message.helps";

@Injectable()
export class UpdateProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private productRepository: IProductRepository,
    ) { }

    async execute(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
        const productId = await this.productRepository.findById(id);

        if (!productId) {
            throw new HttpException(
                ProductionMessageHelper.ID_NOT_EXIST,
                HttpStatus.BAD_REQUEST,
            );
        }

        if (updateProductDto.code && productId.code !== updateProductDto.code) {
            const getCode = await this.productRepository.findByCode(updateProductDto.code);
            if (getCode) {
                throw new HttpException(
                    ProductionMessageHelper.EXIST_CODE,
                    HttpStatus.BAD_REQUEST,
                );
            }
        }

        const updatedData: Product = {
            name: updateProductDto.name || productId.name,
            code: updateProductDto.code || productId.code,
            description: updateProductDto.description || productId.description,
            price: updateProductDto.price || productId.price,
            quantityInStock: updateProductDto.quantityInStock || productId.quantityInStock,
            category: updateProductDto.category || productId.category,
            active: updateProductDto.active || productId.active
        };

        const product = Product.updateProduct(updatedData);
        const updateProduct = await this.productRepository.update(id, product);
        return updateProduct;

    }
}