import { Spinner, useBoolean } from "@chakra-ui/react";
import { AuthState } from "domain/auth/entities/auth-state";
import { PropsWithChildren, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { container } from "src/container";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const getAuthState = container.resolve("getAuthState");

  const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false });
  const [isLoading, setIsLoading] = useBoolean(true);

  useEffect(() => {
    getAuthState.get().then((state) => {
      setAuthState(state);
      setIsLoading.off();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spinner size="xl" />;
  }

  if (!authState.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
