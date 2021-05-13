const calculateTotalFromQuantityAndPrice = (quantity, price) => {
  const priceInCents = price * 100;
  const total = (priceInCents * quantity) / 100;
  return total.toFixed(2);
};

export { calculateTotalFromQuantityAndPrice };
