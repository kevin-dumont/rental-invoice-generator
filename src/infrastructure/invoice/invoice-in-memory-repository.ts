import { InvoiceRepository } from "domain/invoice/repository/invoice-adapter";
import { Invoice } from "domain/invoice/entities/Invoice";
import { InvoiceLineItem } from "domain/invoice/entities/InvoiceLineItem";
import { getDayDiffBetweenTwoDates } from "shared/utils/dates/getDayDiffBetweenTwoDates";
import { round } from "shared/utils/numbers/round";
import { trunc } from "shared/utils/numbers/trunc";

/* Tarif taxe de séjour = 1,43€ 
+ 10% de 1,43€ (taxe additionnelle départementale) 
+ 15% de 1,43€ (taxe additionnelle régionale) 
+ 200% de 1,43€ (taxe additionnelle régionale) */

const ESSONNE_COEFF = 0.1;
const GRAND_PARIS_COEFF = 0.15;
const ADDITIONAL_TAXES_COEFF = 2;

export class InvoiceInMemoryRepository implements InvoiceRepository {
  async computePrices({ stay, client, lineItems, ...rest }: Invoice) {
    const { startDate, endDate } = stay;

    const nbNights = getDayDiffBetweenTwoDates(endDate, startDate) || 0;

    const nightPrice = lineItems.find(
      (item) => item.name === "nightPrice"
    )?.unitPrice;

    const cleaningFees = lineItems.find(
      (item) => item.name === "cleaningFees"
    )?.unitPrice;

    const taxes = this.calculateTaxes(
      stay.nbAdults,
      nbNights,
      nightPrice,
      cleaningFees
    );

    const nextLineItems: InvoiceLineItem[] = [
      {
        name: "nightPrice",
        quantity: nbNights || 0,
        unitPrice: nightPrice ?? 0,
        totalPrice: Math.max(trunc((nightPrice ?? 0) * nbNights), 0) || 0,
      },
      {
        name: "cleaningFees",
        quantity: 1,
        unitPrice: cleaningFees ?? 0,
        totalPrice: cleaningFees ?? 0,
      },
      {
        name: "stayTaxes",
        quantity: 1,
        unitPrice: taxes,
        totalPrice: taxes,
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
    nightlyRateWithoutCleaning?: number,
    cleaningFees?: number
  ) {
    const computedNightPrice =
      ((cleaningFees ?? 0) + (nightlyRateWithoutCleaning ?? 0) * nbNights) /
      nbNights;

    const baseUnitTax = Math.min(
      (computedNightPrice / nbTravelers) * 0.05,
      4.3
    );

    const unitTaxes = trunc(
      baseUnitTax +
        trunc(baseUnitTax * ESSONNE_COEFF) +
        trunc(baseUnitTax * GRAND_PARIS_COEFF) +
        trunc(baseUnitTax * ADDITIONAL_TAXES_COEFF)
    );

    const totalTaxes = round(unitTaxes * nbNights * nbTravelers);

    return isNaN(totalTaxes) ? 0 : totalTaxes;
  }
}
