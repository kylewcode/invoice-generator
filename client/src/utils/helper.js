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
  newLineItems.forEach(item => {
    if (item.details === details) {
      const index = newLineItems.indexOf(item);
      newLineItems.splice(index, 1);
    }
  });
  return newLineItems;
}

const getLineItemsTotals = lineItems => {
  return lineItems.map(item => item.total);
};

/* Math Calculations */
const calculateTotalFromQuantityAndPrice = (quantity, price) => {
  const priceInCents = price * 100;
  const total = (priceInCents * quantity) / 100;
  return parseFloat(total.toFixed(2));
};

const convertDollarsToCents = dollars => {
  return Math.round(dollars * 100);
};

const convertCentsToDollars = cents => {
  return cents / 100;
};

const calculateSubtotal = itemTotalsInDollars => {
  const itemTotalsInCents = itemTotalsInDollars.map(total =>
    convertDollarsToCents(total)
  );
  return convertCentsToDollars(
    itemTotalsInCents.reduce((subTotal, currentTotal) => {
      return subTotal + currentTotal;
    })
  );
};

const calculateTax = (taxRate, subTotal) => {
  const subTotalCopy = subTotal;
  const tax = convertDollarsToCents(subTotalCopy * (taxRate / 100));
  return convertCentsToDollars(tax);
};

const calculateGrandTotal = (subTotal, tax) => {
  const subTotalInCents = convertDollarsToCents(subTotal);
  const taxInCents = convertDollarsToCents(tax);
  const grandTotal = subTotalInCents + taxInCents;
  return convertCentsToDollars(grandTotal);
};

const calculateTaxAndTotalsByItemTotalsAndTaxRate = (
  itemTotals,
  taxRate
) => {
  const subTotal = calculateSubtotal(itemTotals);
  const tax = calculateTax(taxRate, subTotal);
  const grandTotal = calculateGrandTotal(subTotal, tax);
  return {
    grandTotal,
    tax,
    subTotal,
  };
};

export {
  calculateTotalFromQuantityAndPrice,
  updateLineItemQuantityByItemsDetailsQuantity,
  removeLineItemFromLineItemsByDetails,
  calculateTaxAndTotalsByItemTotalsAndTaxRate,
  getLineItemsTotals,
};
