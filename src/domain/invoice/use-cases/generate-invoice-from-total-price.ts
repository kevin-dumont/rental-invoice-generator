import { InvoiceAdapter } from '../adapters/invoice-adapter';
import { Client } from '../models/Client';
import { Stay } from '../models/Stay';
import { IGenerateInvoiceFromTotalPriceUseCase } from './interfaces/generate-invoice-from-total-price';

export class GenerateInvoiceFromTotalPriceUseCase
  implements IGenerateInvoiceFromTotalPriceUseCase
{
  invoiceAdapter: InvoiceAdapter;

  constructor(invoiceAdapter: InvoiceAdapter) {
    this.invoiceAdapter = invoiceAdapter;
  }

  async execute(
    stay: Stay,
    client: Client,
    totalPriceWanted: number,
    cleaningFees: number
  ) {
    return await this.invoiceAdapter.generateStayFromPrice(
      stay,
      client,
      totalPriceWanted,
      cleaningFees
    );
  }
}
