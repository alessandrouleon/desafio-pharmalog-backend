import { IsString, Matches } from 'class-validator';
import { UserMessageHelper } from 'src/utils/message.helps';

export class CreateUserDto {

    @IsString()
    @Matches(/\S/, { message: UserMessageHelper.EMPTY_NAME })
    name: string;

    @IsString()
    @Matches(/\S/, { message: UserMessageHelper.EMPTY_USERNAME })
    username: string;

    @IsString()
    @Matches(/\S/, { message: UserMessageHelper.EMPTY_PASSWORD })
    password: string;

    @IsString()
    @Matches(/\S/, { message: UserMessageHelper.EMPTY_EMAIL })
    email: string;

    // updatedAt?: Date;
    // deletedAt?: Date;
}
