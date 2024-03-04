import { FC } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { SmartInvoiceScreen } from 'application/invoice/components/InvoiceScreen/component';
import { InvoiceScreenViewModel } from 'application/invoice/components/InvoiceScreen/view-model';
import { GenerateInvoiceFromTotalPriceUseCase } from 'domain/invoice/use-cases/generate-invoice-from-total-price';
import { InvoiceInMemoryAdapter } from 'infrastructure/invoice/InMemory/invoice-adapter';

export const App = () => {
  const generateInvoiceFromTotalPriceUseCase =
    new GenerateInvoiceFromTotalPriceUseCase(new InvoiceInMemoryAdapter());
  const viewModel = new InvoiceScreenViewModel(
    generateInvoiceFromTotalPriceUseCase
  );

  return (
    <ChakraProvider>
      <SmartInvoiceScreen viewModel={viewModel} />
    </ChakraProvider>
  );
};
