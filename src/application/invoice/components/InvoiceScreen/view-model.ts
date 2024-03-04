import { IGenerateInvoiceFromTotalPriceUseCase } from 'domain/invoice/use-cases/interfaces/generate-invoice-from-total-price';
import { Address } from 'domain/invoice/models/Address';
import { Client } from 'domain/invoice/models/Client';
import { Invoice } from 'domain/invoice/models/Invoice';
import { Stay } from 'domain/invoice/models/Stay';
import { action, observable } from 'mobx';
import { IInvoiceViewModel } from '../InvoiceScreen/types';

export class InvoiceScreenViewModel implements IInvoiceViewModel {
  private generateInvoiceFromTotalPrice: IGenerateInvoiceFromTotalPriceUseCase;
  invoice: Invoice | null = null;

  @observable wantedTotalPrice = 0;
  @observable nbAdults = 0;
  @observable cleaningFees = 0;
  @observable startDate = new Date();
  @observable endDate = new Date();
  @observable location = '';
  @observable firstName = '';
  @observable lastName = '';
  @observable address: Address = {
    street: '',
    zipCode: '',
    city: '',
  };

  constructor(
    generateInvoiceFromTotalPrice: IGenerateInvoiceFromTotalPriceUseCase
  ) {
    this.generateInvoiceFromTotalPrice = generateInvoiceFromTotalPrice;
  }

  @action async refresh() {
    this.createStay();
    this.invoice = await this.generateInvoiceFromTotalPrice.execute(
      this.createStay(),
      this.createClient(),
      this.wantedTotalPrice,
      this.cleaningFees
    );
  }

  private createStay(): Stay {
    return {
      nbAdults: this.nbAdults,
      nbChildren: 0,
      startDate: this.startDate,
      endDate: this.endDate,
      location: this.location,
    };
  }

  private createClient(): Client {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
    };
  }
}
