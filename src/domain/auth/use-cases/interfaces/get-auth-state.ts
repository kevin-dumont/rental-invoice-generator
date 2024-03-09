import { AuthState } from "domain/auth/entities/auth-state";

export interface IGetAuthState {
  get(): Promise<AuthState>;
}
