import { Module } from '@nestjs/common';
import { CreateProductUseCase } from 'src/application/use-cases/products/create-product.use-case';
import { ProductRepository } from 'src/infrastructure/database/repositories/products/product.repository';
import { ProductController } from '../../controllers/products/product.controller';

@Module({
    controllers: [ProductController],
    exports: [],
    providers: [
        CreateProductUseCase,
        // UpdateUserUseCase,
        // DeleteUserUseCase,
        // GetUserUseCase,
        {
            provide: 'IProductRepository',
            useClass: ProductRepository,
        },
    ],
    imports: [],
})
export class ProductModule { }
