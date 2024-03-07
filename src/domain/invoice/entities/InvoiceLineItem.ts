export interface InvoiceLineItem {
  name: "nightPrice" | "stayTaxes" | "cleaningFees";
  quantity?: number;
  unitPrice: number;
  totalPrice?: number;
}
