import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/appErrors";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    private userRepository: IUserRepository;

    constructor(@inject("UserRepository") userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute({ name, password, email, driver_license }: ICreateUserDTO): Promise<void> {
        const emailExists = await this.userRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("Email already in use", 409);
        }

        const passwordHash = await hash(password, 8);

        await this.userRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license,
        });
    }
}

export { CreateUserUseCase };
