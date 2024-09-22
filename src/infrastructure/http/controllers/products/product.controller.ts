import {
    Body,
    Controller,
    Post
} from '@nestjs/common';
import { CreateProductDto } from 'src/application/dtos/products/create-product.dto';
import { CreateProductUseCase } from 'src/application/use-cases/products/create-product.use-case';

@Controller('products')
export class ProductController {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        // private readonly updateProducUseCase: UpdateUserUseCase,
        // private readonly deleteProductUseCase: DeleteUserUseCase,
        // private readonly getProductUseCase: GetUserUseCase,
    ) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.createProductUseCase.execute(createProductDto);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.updateUserUseCase.execute(id, updateUserDto);
    // }

    // @Delete(':id')
    // delete(@Param('id') id: string) {
    //     return this.deleteUserUseCase.execute(id);
    // }

    // @Get('search/:page')
    // async findSearch(
    //     @Param('page') page: number,
    //     @Query('value') value: string,
    // ) {
    //     return this.getUserUseCase.getUsers(value, page);
    // }

}