export async function fetchPriceHistory(tokenId, days = 7) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`
  );
  const json = await res.json();

  return json.prices.map(([timestamp, price]) => ({
    timestamp,
    price,
  }));
}
