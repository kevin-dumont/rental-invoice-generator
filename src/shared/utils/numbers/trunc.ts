export const trunc = (amount: number) => {
  return Math.round((Math.trunc(amount * 100) / 100) * 100) / 100;
};
