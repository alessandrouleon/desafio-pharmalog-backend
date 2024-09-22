import { IsBoolean, IsNumber, IsString, Matches } from 'class-validator';
import { ProductionMessageHelper } from 'src/utils/message.helps';

export class CreateProductDto {

    @IsString()
    @Matches(/\S/, { message: ProductionMessageHelper.EMPTY_NAME })
    name: string;

    @IsString()
    @Matches(/\S/, { message: ProductionMessageHelper.EMPTY_CODE_PRODUCT })
    code: string;

    @IsString()
    @Matches(/\S/, { message: ProductionMessageHelper.EMPTY_DESCRIPTION })
    description: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantityInStock: number;

    @IsString()
    @Matches(/\S/, { message: ProductionMessageHelper.EMPTY_CATEGORY })
    category: string;

    @IsBoolean()
    active: boolean;
}
