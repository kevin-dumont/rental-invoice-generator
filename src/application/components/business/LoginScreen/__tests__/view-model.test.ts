import { describe, expect, it, vi } from "vitest";
import { ILogin } from "domain/auth/use-cases/interfaces/login";
import { LoginScreenViewModel } from "../view-model";

const fakeLoginUseCase: ILogin = {
  async execute() {
    return {
      state: "success",
      message: "string",
    };
  },
};

describe("LoginScreenViewModel", () => {
  it("should update username when the field change", () => {
    const viewModel = new LoginScreenViewModel({ login: fakeLoginUseCase });

    const givenEvent = { currentTarget: { value: "toto" } };

    viewModel.onUsernameChange(givenEvent);

    expect(viewModel.username).toBe("toto");
  });

  it("should update password when the field change", () => {
    const viewModel = new LoginScreenViewModel({ login: fakeLoginUseCase });

    const givenEvent = { currentTarget: { value: "azerty123456" } };

    viewModel.onPasswordChange(givenEvent);

    expect(viewModel.password).toBe("azerty123456");
  });

  it("call the login service with the right params", () => {
    const givenLoginService: ILogin = { execute: vi.fn() };

    const viewModel = new LoginScreenViewModel({ login: givenLoginService });

    viewModel.username = "toto";
    viewModel.password = "azerty";

    viewModel.onLoginClick();

    expect(givenLoginService.execute).toHaveBeenCalledWith("toto", "azerty");
  });
});
