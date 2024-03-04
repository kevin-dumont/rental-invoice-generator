import { Address } from 'domain/invoice/models/Address';

export interface IInvoiceViewModel {
  wantedTotalPrice: number;
  nbAdults: number;
  cleaningFees: number;
  startDate: Date;
  endDate: Date;
  location: string;
  firstName: string;
  lastName: string;
  address: Address;
  refresh(): void;
}
