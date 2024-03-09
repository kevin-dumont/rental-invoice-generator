import { GenericInputEvent } from "application/types/GenericInputEvent";
import { ILogin } from "domain/auth/use-cases/interfaces/login";
import { makeAutoObservable } from "mobx";

export class LoginScreenViewModel {
  login: ILogin;

  username: string = "";
  password: string = "";

  constructor({ login }: { login: ILogin }) {
    this.login = login;

    makeAutoObservable(this);
  }

  onLoginClick = () => {
    return this.login.execute(this.username, this.password);
  };

  onUsernameChange = (e: GenericInputEvent) => {
    this.username = e.currentTarget.value;
    console.log("e", e.currentTarget.value);
  };

  onPasswordChange = (e: GenericInputEvent) => {
    this.password = e.currentTarget.value;
    console.log("e", e.currentTarget.value);
  };
}
