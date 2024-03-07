import { createContainer, asClass, InjectionMode } from "awilix";

import { InvoiceScreenViewModel } from "application/components/business/InvoiceScreen/view-model";
import { GenerateInvoice } from "domain/invoice/use-cases/compute-prices";
import { InvoiceInMemoryAdapter } from "infrastructure/invoice/InMemory/invoice-adapter";

export const container = createContainer({
  injectionMode: InjectionMode.PROXY,
  strict: true,
});

container.register({
  computePrices: asClass(GenerateInvoice),
  invoiceAdapter: asClass(InvoiceInMemoryAdapter),
  invoiceScreenViewModel: asClass(InvoiceScreenViewModel),
});
