import { AuthenticationRepository } from "../repository/authentication";
import { ILogout } from "./interfaces/logout";

export class Logout implements ILogout {
  authenticationRepository: AuthenticationRepository;

  constructor({
    authenticationRepository,
  }: {
    authenticationRepository: AuthenticationRepository;
  }) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute() {
    return await this.authenticationRepository.logout();
  }
}
