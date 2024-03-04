import { Client } from './Client';
import { InvoiceLineItem } from './InvoiceLineItem';
import { Stay } from './Stay';

export type Invoice = {
  client: Client;
  stay: Stay;
  lineItems: InvoiceLineItem[];
};
