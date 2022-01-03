import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/appErrors";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };

    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    private userRepository: IUserRepository;

    constructor(@inject("UserRepository") userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect", 401);
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect", 401);
        }

        const token = sign({}, "56ef6d754986340cd988329b633a2449", {
            subject: user.id,
            expiresIn: "1d",
        });

        const tokenReturn: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },

            token,
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
