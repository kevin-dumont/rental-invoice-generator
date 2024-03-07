import { InvoiceAdapter } from "../adapters/invoice-adapter";
import { Invoice } from "../entities/Invoice";
import { IComputePrices } from "./interfaces/compute-prices";

export class GenerateInvoice implements IComputePrices {
  invoiceAdapter: InvoiceAdapter;

  constructor(invoiceAdapter: InvoiceAdapter) {
    this.invoiceAdapter = invoiceAdapter;
  }

  async execute(invoice: Invoice) {
    return await this.invoiceAdapter.computePrices(invoice);
  }
}
