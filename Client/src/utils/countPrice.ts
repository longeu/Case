export const checkDiscount = (
  priceSell: number,
  discountSell: number
): number => {
  if (discountSell > 0) {
    return priceSell - (priceSell * discountSell) / 100;
  }
  return priceSell;
};

export const discountPrice = (
  priceSell: number,
  discountSell: number
): number => {
  return (priceSell * discountSell) / 100;
};
