/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useState } from "react";
import { formatPercent, formatPrice } from "@/utils/format";
import { fetchTopTokens } from "@/utils/fetchTokens";
import { useToken } from "@/context/TokenContext";

export default function TokenList() {
  const { selectedToken, setSelectedToken } = useToken();
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
    <div css={styles.container}>
      <h2 css={styles.heading}>Top Tokens</h2>
      <div css={styles.list}>
        {tokens.map((token) => (
          <button
            key={token.id}
            css={[
              styles.button,
              selectedToken?.id === token.id && styles.selected,
            ]}
            onClick={() => setSelectedToken(token)}
          >
            <div css={styles.name}>{token.name}</div>
            <div css={styles.price}>
              {formatPrice(token.current_price)} (
              {formatPercent(token.price_change_percentage_24h)})
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: (theme) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  }),
  heading: (theme) => ({
    fontSize: theme.fontSizes.large,
    marginBottom: theme.spacing(1),
  }),
  list: (theme) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(0.75),
  }),
  button: (theme) => ({
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.card,
    border: theme.border,
    borderRadius: theme.borderRadius,
    padding: `${theme.spacing(1)} ${theme.spacing(1.25)}`,
    cursor: "pointer",
    color: theme.colors.text,
    fontSize: theme.fontSizes.medium,
    textAlign: "left",
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: theme.colors.cardHover,
    },
    "&:focus": {
      outline: `2px solid ${theme.colors.focusOutline}`,
      outlineOffset: "2px",
    },
  }),
  selected: (theme) => ({
    backgroundColor: theme.colors.primary,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.colors.primary,
    },
    cursor: "auto",
  }),
  name: {
    fontWeight: "bold",
  },
  price: (theme) => ({
    fontSize: theme.fontSizes.small,
    opacity: 0.8,
  }),
};
