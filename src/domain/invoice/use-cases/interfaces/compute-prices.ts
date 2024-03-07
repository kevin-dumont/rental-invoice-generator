import { Invoice } from "domain/invoice/entities/Invoice";

export interface IComputePrices {
  execute(invoice: Invoice): Promise<Invoice>;
}
