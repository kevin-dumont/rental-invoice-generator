import { Invoice } from "../entities/Invoice";

export interface InvoiceAdapter {
  computePrices(invoice: Invoice): Promise<Invoice>;
}
