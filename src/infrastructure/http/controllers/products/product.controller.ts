import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { CreateProductDto } from 'src/application/dtos/products/create-product.dto';
import { UpdateProductDto } from 'src/application/dtos/products/update-product.dto';
import { CreateProductUseCase } from 'src/application/use-cases/products/create-product.use-case';
import { DeleteProductUseCase } from 'src/application/use-cases/products/delete-product.use-case';
import { UpdateProductUseCase } from 'src/application/use-cases/products/update-product.use-case';

@Controller('products')
export class ProductController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly updateProductUseCase: UpdateProductUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase
        // private readonly getProductUseCase: GetUserUseCase,
    ) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.createProductUseCase.execute(createProductDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.updateProductUseCase.execute(id, updateProductDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.deleteProductUseCase.execute(id);
    }

    // @Get('search/:page')
    // async findSearch(
    //     @Param('page') page: number,
    //     @Query('value') value: string,
    // ) {
    //     return this.getUserUseCase.getUsers(value, page);
    // }

}