import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { container } from "../../../../container";
import { SmartInvoiceScreen } from "application/components/business/InvoiceScreen";
import { SmartLoginScreen } from "../LoginScreen";
import { ProtectedRoute } from "../../ui/ProtectedRoute";

export const App = () => {
  const invoiceScreenViewModel = container.resolve("invoiceScreenViewModel");
  const loginScreenViewModel = container.resolve("loginScreenViewModel");

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SmartInvoiceScreen viewModel={invoiceScreenViewModel} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<SmartLoginScreen viewModel={loginScreenViewModel} />}
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
