import { AuthState } from "domain/auth/entities/auth-state";

export interface ILogout {
  execute(): Promise<AuthState>;
}
