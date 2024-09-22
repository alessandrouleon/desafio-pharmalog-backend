import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Product } from 'src/domain/entities/products/product.entity';
import { IProductRepository } from 'src/domain/repositories/products/product-repository.interface';
import { ProductionMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class DeleteProductUseCase {
    constructor(
        @Inject('IProductRepository')
        private productRepository: IProductRepository,
    ) { }

    async execute(id: string): Promise<void> {

        const existsProduct = await this.productRepository.findById(id);

        if (!existsProduct) {
            throw new HttpException(
                ProductionMessageHelper.ID_NOT_EXIST_FOR_DELETED,
                HttpStatus.BAD_REQUEST,
            );
        }

        const deleteProduct = Product.deleteProduct(existsProduct);

        await this.productRepository.delete(id, { ...deleteProduct });
    }
}
