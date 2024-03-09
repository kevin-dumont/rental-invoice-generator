import { useNavigate } from "react-router-dom";
import { LoginScreenViewModel } from "./view-model";

export const useLoginController = (viewModel: LoginScreenViewModel) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await viewModel.onLoginClick();

    if (res.state === "success") {
      navigate("/");
    }
  };

  return {
    handleLogin,
    onUsernameChange: viewModel.onUsernameChange,
    onPasswordChange: viewModel.onPasswordChange,
  };
};
