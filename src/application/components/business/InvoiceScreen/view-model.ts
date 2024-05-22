import { IComputePrices } from "domain/invoice/use-cases/interfaces/compute-prices";
import { Invoice } from "domain/invoice/entities/Invoice";
import { makeAutoObservable } from "mobx";
import { add, format } from "date-fns";
import { dateDisplayFormat } from "shared/utils/dates/displayFormat";
import { round } from "shared/utils/numbers/round";
import { formatPrice } from "shared/utils/numbers/formatPrice";
import { InvoiceLineItem } from "domain/invoice/entities/InvoiceLineItem";
import { dateFieldFormat } from "shared/utils/dates/dateFieldFormat";
import { Client } from "domain/invoice/entities/Client";

const DEFAULT_EXAMPLE_ADDRESS = `10 rue des abricotiers
60800 Crépy-en-valois`;

export class InvoiceScreenViewModel {
  invoice: Invoice = {
    id: format(new Date(), "yyyy/MM/1"),
    type: "quote",
    stay: {
      nbAdults: 3,
      nbChildren: 0,
      startDate: new Date(),
      endDate: add(new Date(), { days: 4 }),
      location: "",
    },
    client: {
      name: "Robert Dupont",
      address: DEFAULT_EXAMPLE_ADDRESS,
    },
    lineItems: [
      { name: "nightPrice", unitPrice: 86.98 },
      { name: "cleaningFees", unitPrice: 65 },
      { name: "stayTaxes", unitPrice: 0 },
    ],
  };

  #computePrices: IComputePrices;

  constructor({ computePrices }: { computePrices: IComputePrices }) {
    this.#computePrices = computePrices;
    this.#compute(this.invoice);

    makeAutoObservable(this);
  }

  #compute(invoice: Invoice) {
    this.#computePrices.execute(invoice).then((invoice) => {
      this.setInvoice(invoice);
    });
  }

  #changeLineItem(itemName: InvoiceLineItem["name"], value: number) {
    this.#compute({
      ...this.invoice,
      lineItems: this.invoice.lineItems.map((item) =>
        item.name === itemName
          ? {
              ...item,
              unitPrice: value,
              totalPrice: value * (item?.quantity ?? 0),
            }
          : item
      ),
    });
  }

  setInvoice = (invoice: Invoice) => {
    this.invoice = {
      ...invoice,
    };
  };

  onClickPrint = (): void => {
    window.print();
  };

  onChangeStart = (date: string) => {
    this.invoice.stay.startDate = new Date(date);
    this.#compute(this.invoice);
  };

  onChangeEnd = (date: string) => {
    this.invoice.stay.endDate = new Date(date);
    this.#compute(this.invoice);
  };

  onNbAdultsChange = (nbAdults: string) => {
    this.invoice.stay.nbAdults = Number.parseInt(nbAdults ?? "0");
    this.#compute(this.invoice);
  };

  onNbChildrenChange = (nbChildren: string) => {
    this.invoice.stay.nbChildren = Number.parseInt(nbChildren ?? "0");
    this.#compute(this.invoice);
  };

  onNightPriceChange = (price: number) => {
    this.#changeLineItem("nightPrice", price);
  };

  onClientChange = (client: Client) => {
    this.invoice.client = client;
  };

  onCleaningFeesChange = (price: number) => {
    this.#changeLineItem("cleaningFees", price);
  };

  onIdChange = (id: string) => {
    this.invoice.id = id;
  };

  onTypeChange = (type: string) => {
    this.invoice.type = type as "invoice" | "quote";
  };

  get formattedIssueDate() {
    return dateDisplayFormat(new Date());
  }

  get formattedDueDate() {
    return dateDisplayFormat(this.invoice.stay.startDate);
  }

  get totalPrice() {
    return round(this.invoice?.totalPrice ?? 0);
  }

  get displayStart() {
    return dateDisplayFormat(this.invoice.stay.startDate);
  }

  get displayEnd() {
    return dateDisplayFormat(this.invoice.stay.endDate);
  }

  get fieldStart() {
    return dateFieldFormat(this.invoice.stay.startDate);
  }

  get fieldEnd() {
    return dateFieldFormat(this.invoice.stay.endDate);
  }

  get formattedTotalPrice() {
    return formatPrice(this.invoice?.totalPrice ?? 0);
  }
}
