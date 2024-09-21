import mongoose from 'mongoose';
import { CreateUserDto } from 'src/application/dtos/users/create-user.dto';
import { PaginatedData } from 'src/utils/pagination';
import { User } from '../../../../domain/entities/users/user.entity';
import { IUserRepository, IUserReturnWithPagination } from '../../../../domain/repositories/users/user-repository.interface';
import { userSchema } from '../../schema/users';

export class UserRepository implements IUserRepository {

    public async create(user: CreateUserDto): Promise<User> {
        console.log("data::", user);
        return new userSchema(user).save();
    }

    public async update(id: string, user: Partial<User>): Promise<User | null> {
        return userSchema.findByIdAndUpdate(id, user, { new: true }).exec();
    }

    public async delete(id: string, user: User): Promise<void> {
        await userSchema.findByIdAndUpdate(id, { deletedAt: user.deletedAt }, { new: true }).exec();
    }

    public async findById(id: string): Promise<User | null> {
        // Verifica se o ID é um ObjectId válido, particular do mongose
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('ID inválido. Deve ter 24 caracteres no formato hexadecimal.');
        }
        const userId = await userSchema.findById(id).exec();
        return userId;
    }

    public async findByUsername(username: string): Promise<User | null> {
        return userSchema.findOne({ username }).exec();
    }

    public async findByEmail(email: string): Promise<User | null> {
        return userSchema.findOne({ email }).exec();
    }

    public async findFilteredUsersWithPagination(value: string,
        { take, page }: PaginatedData): Promise<IUserReturnWithPagination> {
        const query = {
            $or: [
                { name: { $regex: value, $options: 'i' } },
                { username: { $regex: value, $options: 'i' } },
                { email: { $regex: value, $options: 'i' } },
            ],
            deletedAt: { $eq: null }
        };

        const [data, total] = await Promise.all([
            userSchema.find(query)
                .limit(take)
                .skip((page - 1) * take)
                .sort({ createdAt: -1 })
                .select('id name username email password createdAt updatedAt deletedAt'),
            userSchema.countDocuments(query),
        ]);

        return { users: data, total };
    }

    public async findAllUsersWithPagination({ page, take }: PaginatedData): Promise<IUserReturnWithPagination> {
        const query = { deletedAt: { $eq: null } };

        const [data, total] = await Promise.all([
            userSchema.find(query)
                .limit(take)
                .skip((page - 1) * take)
                .sort({ createdAt: -1 })
                .select('id name username email password createdAt updatedAt deletedAt'),
            userSchema.countDocuments(query),
        ]);

        return { users: data, total };
    }


}
