"use client";

import { useEffect, useState } from "react";

import { formatPercent, formatCompactPrice } from "@/utils/format";
import { fetchTopTokens } from "@/utils/fetchTokens";
import { useToken } from "@/context/TokenContext";

export default function TokenList() {
  const { setSelectedToken } = useToken();
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
      <ul>
        {tokens.map((token) => (
          <li key={token.id} onClick={() => setSelectedToken(token)}>
            {token.name}: {formatCompactPrice(token.current_price)}(
            {formatPercent(token.price_change_percentage_24h)})
          </li>
        ))}
      </ul>
    </div>
  );
}
