import {
    Body,
    Controller,
    Post
} from '@nestjs/common';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { CreateUserUseCase } from 'src/application/use-cases/users/create-user.use-case';

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,

    ) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }
}