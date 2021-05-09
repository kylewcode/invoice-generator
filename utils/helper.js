const preventPriceCalculationErrors = price => {
  return Math.round(price * 100);
};

const validateLineItems = lineItems => {
  if (!Array.isArray(lineItems) || lineItems.length === 0) {
    console.log(
      'Error: Invalid data type. Data must contain a top level array of non-zero length.'
    );
    return false;
  }

  for (const item of lineItems) {
    if (typeof item !== 'object' || item === null || item.length === 0) {
      console.log(
        'Error: Invalid data type for elements of array. Elements must be objects.'
      );
      return false;
    }
    const propertyNames = Object.keys(item);

    if (propertyNames.length === 0) {
      console.log(
        'Error: Elements of array should be objects that are not empty.'
      );
      return false;
    }

    for (const name of propertyNames) {
      if (
        name !== 'details' &&
        name !== 'price' &&
        name !== 'quantity' &&
        name !== 'total'
      ) {
        console.log('Error: Invalid property name/names');
        return false;
      }
    }

    for (const item of lineItems) {
      if (
        typeof item.details !== 'string' ||
        typeof item.price !== 'number' ||
        typeof item.quantity !== 'number' ||
        typeof item.total !== 'number'
      ) {
        console.log('Error: Invalid data type for line item property value');
        return false;
      }
    }
  }

  return true;
};

module.exports = { preventPriceCalculationErrors, validateLineItems };
