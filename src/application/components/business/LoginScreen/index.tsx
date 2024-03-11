import {
  Button,
  Card,
  CardBody,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import { LoginScreenViewModel } from "./view-model";
import { useNavigate } from "react-router-dom";

import.meta.env.VITE_SOME_KEY;

export const LoginScreen = ({
  viewModel,
}: {
  viewModel: LoginScreenViewModel;
}) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await viewModel.onLoginClick();

    if (res.state === "success") {
      navigate("/");
    }
  };

  return (
    <Container size="xs">
      <Card mt={100}>
        <CardBody>
          <Heading size="md" mb={7}>
            Connexion
          </Heading>

          <FormControl mb={3}>
            <FormLabel>Nom d&apos;utilisateur</FormLabel>
            <Input onChange={viewModel.onUsernameChange} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Mot de passe</FormLabel>
            <Input type="password" onChange={viewModel.onPasswordChange} />
          </FormControl>

          <Button onClick={handleLogin}>Se connecter</Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export const SmartLoginScreen = observer(LoginScreen);
