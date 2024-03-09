import { InvoiceRepository } from "../repository/invoice-adapter";
import { Invoice } from "../entities/Invoice";
import { IComputePrices } from "./interfaces/compute-prices";

export class ComputePrices implements IComputePrices {
  invoiceRepository: InvoiceRepository;

  constructor({ invoiceRepository }: { invoiceRepository: InvoiceRepository }) {
    this.invoiceRepository = invoiceRepository;
  }

  async execute(invoice: Invoice) {
    return await this.invoiceRepository.computePrices(invoice);
  }
}
