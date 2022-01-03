import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";

class UserRepositoryInMemory implements IUserRepository {
    users: User[] = [];

    async create({ name, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            password,
            email,
            driver_license,
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((user) => {
            return user.email === email;
        });

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find((user) => {
            return user.id === id;
        });

        return user;
    }
}

export { UserRepositoryInMemory };
