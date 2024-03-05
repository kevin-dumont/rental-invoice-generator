import { ChakraProvider } from "@chakra-ui/react";
import { SmartInvoiceScreen } from "application/components/InvoiceScreen";
import { InvoiceScreenViewModel } from "application/components/InvoiceScreen/view-model";
import { GenerateInvoiceFromTotalPriceUseCase } from "domain/invoice/use-cases/generate-invoice-from-total-price";
import { InvoiceInMemoryAdapter } from "infrastructure/invoice/InMemory/invoice-adapter";

const generateInvoiceFromTotalPriceUseCase =
  new GenerateInvoiceFromTotalPriceUseCase(new InvoiceInMemoryAdapter());
const viewModel = new InvoiceScreenViewModel(
  generateInvoiceFromTotalPriceUseCase
);

export const App = () => {
  return (
    <ChakraProvider>
      <SmartInvoiceScreen viewModel={viewModel} />
    </ChakraProvider>
  );
};
