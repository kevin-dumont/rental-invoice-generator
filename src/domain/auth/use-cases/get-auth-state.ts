import { AuthenticationRepository } from "../repository/authentication";
import { IGetAuthState } from "./interfaces/get-auth-state";

export class GetAuthState implements IGetAuthState {
  authenticationRepository: AuthenticationRepository;

  constructor({
    authenticationRepository,
  }: {
    authenticationRepository: AuthenticationRepository;
  }) {
    this.authenticationRepository = authenticationRepository;
  }

  async get() {
    return await this.authenticationRepository.getAuthState();
  }
}
