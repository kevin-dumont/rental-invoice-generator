import { IGenerateInvoiceFromTotalPriceUseCase } from "domain/invoice/use-cases/interfaces/generate-invoice-from-total-price";
import { Address } from "domain/invoice/models/Address";
import { Client } from "domain/invoice/models/Client";
import { Invoice } from "domain/invoice/models/Invoice";
import { Stay } from "domain/invoice/models/Stay";
import { makeAutoObservable } from "mobx";
import { format } from "date-fns";

export class InvoiceScreenViewModel {
  private generateInvoiceFromTotalPrice: IGenerateInvoiceFromTotalPriceUseCase;

  invoice: Invoice | null = null;
  wantedTotalPrice: number = 0;
  nbAdults: number = 0;
  nbChildren: number = 0;
  cleaningFees: number = 65;
  startDate: Date = new Date();
  endDate: Date = new Date();
  location: string = "";
  firstName: string = "";
  lastName: string = "";
  address: Address = {
    street: "",
    zipCode: "",
    city: "",
  };

  constructor(
    generateInvoiceFromTotalPrice: IGenerateInvoiceFromTotalPriceUseCase
  ) {
    this.generateInvoiceFromTotalPrice = generateInvoiceFromTotalPrice;
    makeAutoObservable(this);
  }

  generateInvoice() {
    const stay: Stay = {
      nbAdults: this.nbAdults,
      nbChildren: this.nbChildren,
      startDate: this.startDate,
      endDate: this.endDate,
      location: this.location,
    };

    const client: Client = {
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
    };

    this.generateInvoiceFromTotalPrice
      .execute(stay, client, this.wantedTotalPrice, this.cleaningFees)
      .then(this.setInvoice);
  }

  setInvoice = (invoice: Invoice) => {
    this.invoice = invoice;
  };

  onWantedTotalPriceChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.wantedTotalPrice = Number.parseInt(e.currentTarget.value || "0", 10);
    this.generateInvoice();
  };

  onNbAdultsChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.nbAdults = Number.parseInt(e.currentTarget.value || "0", 10);
    this.generateInvoice();
  };

  onNbChildrenChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.nbChildren = Number.parseInt(e.currentTarget.value || "0", 10);
    this.generateInvoice();
  };

  onCleaningFeesChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.cleaningFees = Number.parseInt(e.currentTarget.value || "0", 10);
    this.generateInvoice();
  };

  onStartDateChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.startDate = new Date(e.currentTarget.value);
    this.generateInvoice();
  };

  onEndDateChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.endDate = new Date(e.currentTarget.value);
    this.generateInvoice();
  };

  onLocationChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.location = e.currentTarget.value;
    this.generateInvoice();
  };

  onFirstNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.firstName = e.currentTarget.value;
    this.generateInvoice();
  };

  onLastNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.lastName = e.currentTarget.value;
    this.generateInvoice();
  };

  onAddressStreetChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.address.street = e.currentTarget.value;
    this.generateInvoice();
  };

  onAddressZipCodeChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.address.zipCode = e.currentTarget.value;
    this.generateInvoice();
  };

  onAddressCityChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.address.city = e.currentTarget.value;
    this.generateInvoice();
  };

  get formattedStartDate() {
    return format(this.startDate, "yyyy-MM-dd");
  }

  get formattedEndDate() {
    return format(this.endDate, "yyyy-MM-dd");
  }
}
