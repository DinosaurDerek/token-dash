"use client";

import { useEffect, useState } from "react";
import { fetchTopTokens } from "@/utils/fetchTokenData";
import TokenChart from "@/components/TokenChart";

export default function TokenList() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopTokens()
      .then(setTokens)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading tokens...</p>;

  return (
    <div>
      <h2>Top Tokens</h2>
      <TokenChart data={tokens} />
      <ul>
        {tokens.map((token) => (
          <li key={token.id}>
            {token.name}: ${token.current_price.toLocaleString()} (
            {token.price_change_percentage_24h.toFixed(2)}%)
          </li>
        ))}
      </ul>
    </div>
  );
}
