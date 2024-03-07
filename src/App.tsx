import { ChakraProvider } from "@chakra-ui/react";

import { container } from "./container";
import { SmartInvoiceScreen } from "application/components/business/InvoiceScreen";

export const App = () => {
  const viewModel = container.resolve("invoiceScreenViewModel");

  return (
    <ChakraProvider>
      <SmartInvoiceScreen viewModel={viewModel} />
    </ChakraProvider>
  );
};
