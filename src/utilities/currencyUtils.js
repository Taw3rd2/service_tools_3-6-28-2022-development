import currency from 'currency.js'

export const currencyFormat = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });

  export const toCurrency = (number) => {
    let decimal = parseFloat(number).toFixed(2);
    return formatter.format(decimal);
  }

  export const toMarkUp = (amount) => {
    let number = parseFloat(amount).toFixed(2);
    let newNumber = currency(number).multiply(1.75);
    return formatter.format(newNumber);
  }

  export const toResFlatRate = (partCost, partLabor) => {
    let number = parseFloat(partCost).toFixed(2);
    let markUpNumber = currency(number).multiply(1.75);
    let taxNumber = currency(number).multiply(0.06);
    let retail = markUpNumber.add(taxNumber);
    let labor = parseFloat(partLabor).toFixed(2) * 79;
    return formatter.format(retail.add(labor).value);
  }

  export const toComFlatRate = (partCost, partLabor) => {
    let number = parseFloat(partCost).toFixed(2);
    const currencyNumber = currency(number);
    const markUp = currencyNumber.multiply(1.75);
    const tax = currencyNumber.multiply(0.06);
    const retail = markUp.add(tax);
    let labor = parseFloat(partLabor).toFixed(2) * 89;
    return formatter.format(retail.add(labor).value);
  }

  export const toTax = (amount) => {
    let number = parseFloat(amount).toFixed(2);
    let newNumber = currency(number).multiply(0.06);
    return formatter.format(newNumber);
  }

  export const toRetail = (number) => {
    let newNumber = parseFloat(number).toFixed(2);
    let markUpNumber = currency(newNumber).multiply(1.75);
    let taxNumber = currency(newNumber).multiply(0.06);
    let retailNumber = markUpNumber.add(taxNumber);
    return formatter.format(retailNumber);
  }