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
import { useLoginController } from "./useLoginController";

import.meta.env.VITE_SOME_KEY;

export const LoginScreen = ({
  viewModel,
}: {
  viewModel: LoginScreenViewModel;
}) => {
  const controller = useLoginController(viewModel);

  return (
    <Container size="xs">
      <Card mt={100}>
        <CardBody>
          <Heading size="md" mb={7}>
            Connexion
          </Heading>

          <FormControl mb={3}>
            <FormLabel>Username</FormLabel>
            <Input onChange={controller.onUsernameChange} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Mot de passe</FormLabel>
            <Input type="password" onChange={controller.onPasswordChange} />
          </FormControl>

          <Button onClick={controller.handleLogin}>Login</Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export const SmartLoginScreen = observer(LoginScreen);
