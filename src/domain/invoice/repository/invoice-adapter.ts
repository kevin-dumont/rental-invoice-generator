import { Invoice } from "../entities/Invoice";

export interface InvoiceRepository {
  computePrices(invoice: Invoice): Promise<Invoice>;
}
