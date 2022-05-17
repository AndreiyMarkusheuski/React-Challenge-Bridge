export const getPrice = (prices, currentCurrency) => {
  const { amount, symbol } = parseCurrency(prices, currentCurrency);
  return `${symbol}${amount}`;
};

const parseCurrency = (prices, currentCurrency) =>
  prices
    .map(({ amount, currency }) => ({ amount, ...currency }))
    .filter(({ symbol }) => symbol == currentCurrency)[0];

export const getCookie = (name) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const getPricesSum = (orders, currentCurrency) => {
  let price = 0;
  if (orders.length < 2) {
    const { amount } = parseCurrency(orders[0].prices, currentCurrency);
    price = amount * orders[0].count;
  } else {
    let initState = 0;
    price = orders
      .reduce((previousValue, { prices, count }) => {
        const { amount } = parseCurrency(prices, currentCurrency);
        return previousValue + amount * count;
      }, initState)
      .toFixed(2);
  }

  return `${currentCurrency}${price}`;
};

export const setCookies = (name, data) => {
  document.cookie = `${name}=${JSON.stringify(data)}`;
};

export const setLocalStorage = (name, data) => {
  localStorage.setItem(`${name}`, `${JSON.stringify(data)}`);
};

export const updateAttributes = (
  product,
  attributes,
  attributeSet,
  attribute
) => {
  const updatedAttrs = attributes.map((attr) => {
    const updated = { ...attr };
    if (attr.id === attributeSet) {
      const parsedAttr = attr.items.map((elem) => ({
        ...elem,
        isSelected: elem.id === attribute,
      }));
      updated.items = parsedAttr;
    }
    return updated;
  });
  return { ...product, attributes: updatedAttrs };
};
