import { AuthResult } from "domain/auth/entities/auth-result";
import { AuthState } from "domain/auth/entities/auth-state";
import { AuthenticationRepository } from "domain/auth/repository/authentication";

const localStorageKey = "auth-state";

export class AuthenticationLocalStorageRepository
  implements AuthenticationRepository
{
  async login(username: string, password: string): Promise<AuthResult> {
    console.table({
      1: import.meta.env.VITE_AUTH_USERNAME,
      2: import.meta.env.VITE_AUTH_PASSWORD,
      username,
      password,
    });

    if (
      username === import.meta.env.VITE_AUTH_USERNAME &&
      password === import.meta.env.VITE_AUTH_PASSWORD
    ) {
      const autState: AuthState = { isLoggedIn: true };

      localStorage.setItem(localStorageKey, JSON.stringify(autState));

      console.log("connected");

      return { state: "success" };
    }

    const autState: AuthState = { isLoggedIn: false };

    localStorage.setItem(localStorageKey, JSON.stringify(autState));

    return {
      state: "error",
      message: "Mot de passe ou nom d'utilisateur incorrect",
    };
  }

  async logout(): Promise<AuthState> {
    const autState: AuthState = { isLoggedIn: false };

    localStorage.setItem(localStorageKey, JSON.stringify(autState));

    return autState;
  }

  async getAuthState(): Promise<AuthState> {
    const defaultAutState: AuthState = { isLoggedIn: false };

    const state = localStorage.getItem(localStorageKey);

    try {
      const authState: AuthState = state ? JSON.parse(state) : defaultAutState;

      return authState;
    } catch (e) {
      return defaultAutState;
    }
  }
}
