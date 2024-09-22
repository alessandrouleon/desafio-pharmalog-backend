import { Module } from '@nestjs/common';
import { CreateProductUseCase } from 'src/application/use-cases/products/create-product.use-case';
import { DeleteProductUseCase } from 'src/application/use-cases/products/delete-product.use-case';
import { GetProductUseCase } from 'src/application/use-cases/products/get-product.use-case';
import { UpdateProductUseCase } from 'src/application/use-cases/products/update-product.use-case';
import { ProductRepository } from 'src/infrastructure/database/repositories/products/product.repository';
import { ProductController } from '../../controllers/products/product.controller';

@Module({
    controllers: [ProductController],
    exports: [],
    providers: [
        CreateProductUseCase,
        UpdateProductUseCase,
        DeleteProductUseCase,
        GetProductUseCase,
        {
            provide: 'IProductRepository',
            useClass: ProductRepository,
        },
    ],
    imports: [],
})
export class ProductModule { }
