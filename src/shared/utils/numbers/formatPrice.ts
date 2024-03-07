export const formatPrice = (price: number, currency = "€") => {
  const formattedPrice = price.toFixed(2).replace(".", ",");

  return `${formattedPrice} ${currency}`;
};
