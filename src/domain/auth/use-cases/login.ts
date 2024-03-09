import { ILogin } from "./interfaces/login";
import { AuthenticationRepository } from "../repository/authentication";

export class Login implements ILogin {
  authenticationRepository: AuthenticationRepository;

  constructor({
    authenticationRepository,
  }: {
    authenticationRepository: AuthenticationRepository;
  }) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(username: string, password: string) {
    return await this.authenticationRepository.login(username, password);
  }
}
