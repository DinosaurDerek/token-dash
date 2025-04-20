export async function fetchTopTokens() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
  );
  if (!res.ok) throw new Error("Failed to fetch token data");

  return res.json();
}
