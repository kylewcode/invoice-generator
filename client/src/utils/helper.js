const calculateTotalFromQuantityAndPrice = (quantity, price) => {
  const priceInCents = price * 100;
  const total = (priceInCents * quantity) / 100;
  return parseFloat(total.toFixed(2));
};

function updateLineItemQuantityByItemsDetailsQuantity(
  lineItems,
  details,
  quantity
) {
  const newQuantity = parseFloat(quantity);
  return lineItems.map(item => {
    if (item.details === details) {
      const newTotal = calculateTotalFromQuantityAndPrice(quantity, item.price);
      return {
        ...item,
        quantity: newQuantity,
        total: newTotal,
      };
    }
    return item;
  });
}

function removeLineItemFromLineItemsByDetails(lineItems, details) {
  const newLineItems = [...lineItems];
  newLineItems.forEach((item) => {
    if (item.details === details) {
      const index = newLineItems.indexOf(item);
      newLineItems.splice(index, 1);
    }
  });
  return newLineItems;
}

export {
  calculateTotalFromQuantityAndPrice,
  updateLineItemQuantityByItemsDetailsQuantity,
  removeLineItemFromLineItemsByDetails,
};
