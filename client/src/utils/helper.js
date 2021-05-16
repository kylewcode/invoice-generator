function updateLineItemQuantityByItemsDetailsQuantity(
  lineItems,
  details,
  quantity
) {
  const newQuantity = parseFloat(quantity);
  return lineItems.map(item => {
    if (item.details === details) {
      const newTotal = formatCurrency(
        calculateTotalFromQuantityAndPrice(quantity, item.price)
      );
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
  return lineItems.map(item => {
    // During quantity change for an added line item, number is of type 'number'. To prevent an exception
    //...this conditional ignores the unformatCurrency function.
    if (typeof item.total === 'number') {
      return item.total;
    }
    return unformatCurrency(item.total);
  });
};

function checkInStateForDuplicateLineItem(lineItems, lineItem) {
  for (const item of lineItems) {
    if (item.details === lineItem.details) {
      return true;
    }
  }
  return false;
}

/* Currency Formatting */

function convertCurrencyDataTypes(extractedFormData) {
  const dataCopy = { ...extractedFormData };
  const keys = Object.keys(dataCopy);
  for (const key of keys) {
    if (key === 'total') {
      dataCopy[key] = dataCopy[key].replace('$', '');
    }
    if (key !== 'total' && dataCopy[key][0] === '$') {
      dataCopy[key] = parseFloat(dataCopy[key].replace('$', ''));
    }
    if (key === 'lineItems') {
      for (const item of dataCopy[key]) {
        const lineItemKeys = Object.keys(item);
        for (const itemKey of lineItemKeys) {
          if (item[itemKey][0] === '$') {
            item[itemKey] = parseFloat(item[itemKey].replace('$', ''));
          }
        }
      }
    }
  }
  return dataCopy;
}

function formatCurrency(number) {
  const numberCopy = number;
  return '$'.concat(numberCopy.toFixed(2));
}

function unformatCurrency(number) {
  if (Array.isArray(number)) {
    const numberCopy = number[0];
    return numberCopy.replace('$', '');
  }
  const numberCopy = number;
  return parseFloat(numberCopy.replace('$', ''));
}

/* Math Calculations */
const calculateTotalFromQuantityAndPrice = (quantity, price) => {
  if (typeof price === 'string') {
    const unformattedPrice = unformatCurrency(price);
    const priceInCents = convertDollarsToCents(unformattedPrice);
    const total = (priceInCents * quantity) / 100;
    return total;
  }

  const priceInCents = convertDollarsToCents(price);
  const total = (priceInCents * quantity) / 100;
  return total;
};

function convertDollarsToCents(dollars) {
  return Math.round(dollars * 100);
}

function convertCentsToDollars(cents) {
  return cents / 100;
}

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

const calculateTaxAndTotalsByItemTotalsAndTaxRate = (itemTotals, taxRate) => {
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
  formatCurrency,
  unformatCurrency,
  checkInStateForDuplicateLineItem,
  convertCurrencyDataTypes,
};
