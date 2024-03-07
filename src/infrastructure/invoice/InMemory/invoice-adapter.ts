import { InvoiceAdapter } from "domain/invoice/adapters/invoice-adapter";
import { Invoice } from "domain/invoice/entities/Invoice";
import { InvoiceLineItem } from "domain/invoice/entities/InvoiceLineItem";
import { getDayDiffBetweenTwoDates } from "shared/utils/dates/getDayDiffBetweenTwoDates";
import { round } from "shared/utils/numbers/round";

const ESSONNE_COEFF = 0.15;
const GRAND_PARIS_COEFF = 0.15;
const ADDITIONAL_TAXES_COEFF = 2;

export class InvoiceInMemoryAdapter implements InvoiceAdapter {
  async computePrices({ stay, client, lineItems, ...rest }: Invoice) {
    const { startDate, endDate } = stay;

    const nbNights = getDayDiffBetweenTwoDates(endDate, startDate) || 0;

    const nightPrice = lineItems.find(
      (item) => item.name === "nightPrice"
    )?.unitPrice;

    const cleaningFees = lineItems.find(
      (item) => item.name === "cleaningFees"
    )?.unitPrice;

    const computedNightPrice =
      ((cleaningFees ?? 0) + (nightPrice ?? 0) * nbNights) / nbNights;

    const taxes = this.calculateTaxes(
      stay.nbAdults,
      nbNights,
      computedNightPrice
    );

    const nextLineItems: InvoiceLineItem[] = [
      {
        name: "nightPrice",
        quantity: nbNights || 0,
        unitPrice: nightPrice ?? 0,
        totalPrice: Math.max(round((nightPrice ?? 0) * nbNights), 0) || 0,
      },
      {
        name: "stayTaxes",
        quantity: 1,
        unitPrice: taxes,
        totalPrice: taxes,
      },
      {
        name: "cleaningFees",
        quantity: 1,
        unitPrice: cleaningFees ?? 0,
        totalPrice: cleaningFees ?? 0,
      },
    ];

    const invoice: Invoice = {
      ...rest,
      stay,
      client,
      lineItems: nextLineItems,
      totalPrice: nextLineItems.reduce(
        (curr, acc) => curr + (acc.totalPrice ?? 0),
        0
      ),
    };

    return invoice;
  }

  private calculateTaxes(
    nbTravelers: number,
    nbNights: number,
    nightlyRate: number
  ) {
    const baseUnitTax = Math.min((nightlyRate / nbTravelers) * 0.05, 4.3);
    const unitTaxes =
      baseUnitTax +
      baseUnitTax * ESSONNE_COEFF +
      baseUnitTax * GRAND_PARIS_COEFF +
      baseUnitTax * ADDITIONAL_TAXES_COEFF;

    const totalTaxes = round(unitTaxes * nbNights * nbTravelers);

    return isNaN(totalTaxes) ? 0 : totalTaxes;
  }
}
