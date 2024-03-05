export const formatPrice = (price: number, currency = "€") => {
  return `${`${price}`.split(".").join(",")} ${currency}`;
};
