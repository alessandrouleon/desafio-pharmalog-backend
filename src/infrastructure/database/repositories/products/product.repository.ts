import { HttpException, HttpStatus } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateProductDto } from 'src/application/dtos/products/create-product.dto';
import { Product } from 'src/domain/entities/products/product.entity';
import { IProductRepository, IProductReturnWithPagination } from 'src/domain/repositories/products/product-repository.interface';
import { PaginatedData } from 'src/utils/pagination';
import { productSchema } from '../../schema/product';

export class ProductRepository implements IProductRepository {

    public async create(product: CreateProductDto): Promise<Product> {
        return new productSchema(product).save();
    }

    public async update(id: string, product: Partial<Product>): Promise<Product | null> {
        return productSchema.findByIdAndUpdate(id, product, { new: true }).exec();
    }

    public async delete(id: string, product: Product): Promise<void> {
        await productSchema.findByIdAndUpdate(id, { deletedAt: product.deletedAt }, { new: true }).exec();
    }

    public async findById(id: string): Promise<Product | null> {
        // Verifica se o ID é um ObjectId válido, particular do mongose
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HttpException(
                'ID inválido. Deve ter 24 caracteres no formato hexadecimal.',
                HttpStatus.BAD_REQUEST,
            );
        }
        const productId = await productSchema.findById(id).exec();
        return productId;
    }

    public async findByCode(code: string): Promise<Product | null> {
        return productSchema.findOne({ code }).exec();
    }

    public async findFilteredProductsWithPagination(value: string,
        { take, page }: PaginatedData): Promise<IProductReturnWithPagination> {
        const query = {
            $or: [
                { name: { $regex: value, $options: 'i' } },
                { code: { $regex: value, $options: 'i' } },
                { description: { $regex: value, $options: 'i' } },
            ],
            deletedAt: { $eq: null }
        };

        const [data, total] = await Promise.all([
            productSchema.find(query)
                .limit(take)
                .skip((page - 1) * take)
                .sort({ createdAt: -1 })
                .select('id name  code description price quantityInStock category active createdAt updatedAt deletedAt'),
            productSchema.countDocuments(query),
        ]);

        return { products: data, total };
    }

    public async findAllProductsWithPagination({ page, take }: PaginatedData): Promise<IProductReturnWithPagination> {
        const query = { deletedAt: { $eq: null } };

        const [data, total] = await Promise.all([
            productSchema.find(query)
                .limit(take)
                .skip((page - 1) * take)
                .sort({ createdAt: -1 })
                .select('id name  code description price quantityInStock category active createdAt updatedAt deletedAt'),
            productSchema.countDocuments(query),
        ]);

        return { products: data, total };
    }


}
