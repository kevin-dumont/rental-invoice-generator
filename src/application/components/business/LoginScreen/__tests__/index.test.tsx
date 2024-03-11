import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { screen, render, waitFor } from "../../../../tests/render";
import { SmartLoginScreen } from "..";
import { Route, Routes } from "react-router-dom";

const buildFakeLoginViewModel = () => ({
  login: { execute: vi.fn() },
  username: "",
  password: "",
  onLoginClick: vi.fn().mockResolvedValue({ state: "success" }),
  onUsernameChange: vi.fn(),
  onPasswordChange: vi.fn(),
});

describe("Login component", async () => {
  it.only("should call onUsernameChange when typing in username field", async () => {
    const givenViewModel = buildFakeLoginViewModel();

    render(<SmartLoginScreen viewModel={givenViewModel} />);

    const input = screen.getByLabelText("Nom d'utilisateur");

    userEvent.type(input, "username");

    await waitFor(() => {
      expect(givenViewModel.onUsernameChange).toHaveBeenCalledTimes(8); // "username" contain 8 letters
    });

    await waitFor(() => {
      expect(givenViewModel.onUsernameChange).toHaveBeenCalledWith(
        expect.objectContaining({
          currentTarget: { value: "username" },
        })
      );
    });
  });

  it("should call onPasswordChange when typing in password field", async () => {
    const givenViewModel = buildFakeLoginViewModel();

    render(<SmartLoginScreen viewModel={givenViewModel} />);

    const input = screen.getByLabelText("Mot de passe");

    userEvent.type(input, "p");

    await waitFor(() => {
      expect(givenViewModel.onPasswordChange).toHaveBeenCalledWith(
        expect.objectContaining({
          currentTarget: { value: "p" },
        })
      );
    });
  });

  it("should call onLoginClick when login button is clicked", async () => {
    const givenViewModel = buildFakeLoginViewModel();

    render(<SmartLoginScreen viewModel={givenViewModel} />);

    const loginButton = screen.getByText("Se connecter");

    userEvent.click(loginButton);

    await waitFor(() => {
      expect(givenViewModel.onLoginClick).toHaveBeenCalled();
    });
  });

  it("should redirect to connected page if login succeed", async () => {
    const givenViewModel = buildFakeLoginViewModel();

    givenViewModel.onLoginClick.mockResolvedValueOnce({ state: "success" });

    render(
      <Routes>
        <Route
          path="/login"
          element={<SmartLoginScreen viewModel={givenViewModel} />}
        />
        <Route path="/" element={<h1>Home Page</h1>} />
      </Routes>,
      undefined,
      { initialRouteEntries: ["/login"] }
    );

    const loginButton = screen.getByText("Se connecter");

    userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText("Home Page")).not.toBe(undefined);
    });
  });
});
