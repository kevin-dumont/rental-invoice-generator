import { InvoiceInMemoryRepository } from "./invoice-in-memory-repository";

describe("InvoiceInMemoryRepository", () => {
  describe("calculateTaxes", () => {
    it.each([
      {
        nightPrice: 103.23,
        nbNights: 4,
        nbAdults: 3,
        expected: 67.08,
      },
      {
        nightPrice: 24,
        nbNights: 4,
        nbAdults: 3,
        expected: 15.6,
      },
      {
        nightPrice: 42.72,
        nbNights: 4,
        nbAdults: 3,
        expected: 27.72,
      },
      {
        nightPrice: 108.42,
        nbNights: 4,
        nbAdults: 3,
        expected: 70.56,
      },
      {
        nightPrice: 106.66,
        nbNights: 3,
        nbAdults: 3,
        expected: 52.11,
      },
      {
        nightPrice: 100,
        nbNights: 8,
        nbAdults: 4,
        expected: 130.24,
      },
    ])(
      "should return $expected for a nightly rate of $nightPrice, for $nbAdults adults and $nbNights nights",
      ({ nbAdults, nbNights, nightPrice, expected }) => {
        const instance = new InvoiceInMemoryRepository();

        const res = instance.calculateTaxes(nbAdults, nbNights, nightPrice, 0);

        expect(res).toBe(expected);
      }
    );
  });
});
