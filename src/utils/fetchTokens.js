export async function fetchTokens() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );

    if (res.status === 429) {
      throw new Error(
        "Rate limit exceeded. Please wait a minute and try again."
      );
    }

    if (!res.ok) {
      throw new Error("Failed to fetch tokens.");
    }

    return res.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Request failed. This may be due to rate limiting. Please try again in a minute."
      );
    }

    throw error;
  }
}
