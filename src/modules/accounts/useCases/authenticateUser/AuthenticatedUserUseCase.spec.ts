import { AppError } from "@errors/appErrors";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AuthenticateUserUseCase } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "@modules/accounts/useCases/createUser/CreateUserUseCase";

let userRepositoryInMemory: IUserRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
    });

    it("shold be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            name: "Eduardo Rodrigues",
            email: "contatoeduardofelipe@hotmail.com",
            password: "12345",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("shold not be able to authenticate an user with wrong email", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "999",
                name: "Eduardo Jorge",
                email: "contatoeduardo@hotmail.com",
                password: "321456",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: user.password,
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("shold not be able to authenticate an user with wrong password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "5461",
                name: "Jorge Eduardo",
                email: "contatofelipe@hotmail.com",
                password: "321456",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "21313456",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("shold not be able to authenticate an user with wrong password and email", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "teste@hotmail.com",
                password: "123456",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
