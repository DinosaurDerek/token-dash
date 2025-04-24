export async function fetchPriceHistory(tokenId, days = 7) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`
    );

    if (res.status === 429) {
      throw new Error(
        "Rate limit exceeded. Please wait a minute and try again."
      );
    }

    if (!res.ok) {
      throw new Error("Failed to fetch price history.");
    }

    const json = await res.json();

    return json.prices.map(([timestamp, price]) => ({
      timestamp,
      price,
    }));
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Latest data couldn't be fetched. This may be due to rate limiting. Please try again in a minute."
      );
    }

    throw error;
  }
}
