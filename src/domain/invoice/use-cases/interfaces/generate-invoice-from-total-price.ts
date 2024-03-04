import { Client } from 'domain/invoice/models/Client';
import { Invoice } from 'domain/invoice/models/Invoice';
import { Stay } from 'domain/invoice/models/Stay';

export interface IGenerateInvoiceFromTotalPriceUseCase {
  execute(
    stay: Stay,
    client: Client,
    totalPriceWanted: number,
    cleaningFees: number
  ): Promise<Invoice>;
}
