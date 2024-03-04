import { Client } from '../models/Client';
import { Invoice } from '../models/Invoice';
import { Stay } from '../models/Stay';

export interface InvoiceAdapter {
  generateStayFromPrice(
    stay: Stay,
    client: Client,
    totalWantedPrice: number,
    cleaningFees: number
  ): Promise<Invoice>;
}
