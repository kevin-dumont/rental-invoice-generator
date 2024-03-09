import { AuthResult } from "domain/auth/entities/auth-result";

export interface ILogin {
  execute(username: string, password: string): Promise<AuthResult>;
}
