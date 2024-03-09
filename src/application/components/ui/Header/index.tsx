import { Box, Button, Container } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { container } from "src/container";

export type HeaderProps = {
  className: string;
};

export const Header = ({ className }: HeaderProps) => {
  const navigate = useNavigate();
  const logout = container.resolve("logout");

  const handleLogoutClick = () => {
    logout.execute();

    navigate("/login");
  };

  return (
    <Box py={3} boxShadow="sm" rounded="md" bg="white" className={className}>
      <Container maxW="container.lg" justifyContent="end">
        <Button size="sm" onClick={handleLogoutClick} leftIcon={<LuLogOut />}>
          Déconnexion
        </Button>
      </Container>
    </Box>
  );
};
