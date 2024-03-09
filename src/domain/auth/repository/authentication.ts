import { AuthResult } from "../entities/auth-result";
import { AuthState } from "../entities/auth-state";

export interface AuthenticationRepository {
  getAuthState(): Promise<AuthState>;

  login(username: string, password: string): Promise<AuthResult>;

  logout(): Promise<AuthState>;
}
