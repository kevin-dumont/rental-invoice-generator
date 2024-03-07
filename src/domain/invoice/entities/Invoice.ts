import { Client } from "./Client";
import { InvoiceLineItem } from "./InvoiceLineItem";
import { Stay } from "./Stay";

export type Invoice = {
  id?: string;
  client: Client;
  stay: Stay;
  lineItems: InvoiceLineItem[];
  totalPrice?: number;
};
