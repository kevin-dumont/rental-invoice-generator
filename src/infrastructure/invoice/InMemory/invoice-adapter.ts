import { InvoiceAdapter } from "domain/invoice/adapters/invoice-adapter";
import { Client } from "domain/invoice/models/Client";
import { Invoice } from "domain/invoice/models/Invoice";
import { InvoiceLineItem } from "domain/invoice/models/InvoiceLineItem";
import { Stay } from "domain/invoice/models/Stay";
import { getDayDiffBetweenTwoDates } from "shared/utils/dates/getDayDiffBetweenTwoDates";
import { round } from "shared/utils/numbers/round";

const ESSONNE_COEFF = 0.15;
const GRAND_PARIS_COEFF = 0.15;
const ADDITIONAL_TAXES_COEFF = 2;

export class InvoiceInMemoryAdapter implements InvoiceAdapter {
  async generateStayFromPrice(
    stay: Stay,
    client: Client,
    totalPrice: number,
    cleaningFees: number
  ) {
    const { startDate, endDate } = stay;

    const nbNights = getDayDiffBetweenTwoDates(endDate, startDate) || 0;

    const nightPrice = this.calculateNightlyPrice(
      stay.nbAdults,
      nbNights,
      totalPrice,
      cleaningFees
    );

    const taxes = this.calculateTaxes(stay.nbAdults, nbNights, nightPrice);

    const lineItems: InvoiceLineItem[] = [
      {
        name: "Prix à la nuitée",
        quantity: nbNights || 0,
        unitPrice: nightPrice || 0,
        totalPrice: nbNights * nightPrice || 0,
      },
      {
        name: "Taxe de séjour",
        quantity: 1,
        unitPrice: taxes,
        totalPrice: taxes,
      },
      {
        name: "Frais de ménage",
        quantity: 1,
        unitPrice: cleaningFees,
        totalPrice: cleaningFees,
      },
    ];

    const invoice: Invoice = {
      stay,
      client,
      lineItems,
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

  private calculateNightlyPrice(
    nbTravelers: number,
    nbNights: number,
    totalPriceWanted: number,
    cleaningFees: number
  ) {
    let lowEstimate = 0;
    let highEstimate = totalPriceWanted;
    let estimatedNightlyRate = 0;
    let difference = totalPriceWanted;
    let taxes = 0;
    let nbIteration = 0;

    while (difference > 0.01 && nbIteration < 1000) {
      estimatedNightlyRate = (lowEstimate + highEstimate) / 2;
      taxes = this.calculateTaxes(estimatedNightlyRate, nbNights, nbTravelers);

      const totalPriceExcludingTaxes = round(
        estimatedNightlyRate * nbNights + taxes
      );

      difference = Math.abs(totalPriceWanted - totalPriceExcludingTaxes);

      if (totalPriceExcludingTaxes < totalPriceWanted) {
        lowEstimate = estimatedNightlyRate;
      } else {
        highEstimate = estimatedNightlyRate;
      }
      nbIteration++;
    }

    const price = round(
      (estimatedNightlyRate * nbNights - cleaningFees) / nbNights
    );

    return Math.max(isNaN(price) ? 0 : price, 0);
  }
}
