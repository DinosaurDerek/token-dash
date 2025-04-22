/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useState } from "react";

import { fetchPriceHistory } from "@/utils/fetchPriceHistory";
import { formatHeadingPrice } from "@/utils/format";
import { useToken } from "@/context/TokenContext";
import TokenChart from "@/components/TokenChart";

export default function AppContent() {
  const { selectedToken } = useToken();
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    if (!selectedToken) return;

    const timeout = setTimeout(() => {
      fetchPriceHistory(selectedToken.id).then(setPriceHistory);
    }, 500);

    return () => clearTimeout(timeout);
  }, [selectedToken]);

  if (!selectedToken) return <p>Select a token to view details</p>;

  return (
    <div css={styles.container}>
      <h2 css={styles.heading}>
        {selectedToken.image && (
          <img
            src={selectedToken.image}
            alt={selectedToken.symbol.toUpperCase()}
            css={styles.logo}
          />
        )}
        {selectedToken.name} ({selectedToken.symbol.toUpperCase()})
      </h2>
      <p>Current price: {formatHeadingPrice(selectedToken.current_price)}</p>
      {priceHistory && <TokenChart data={priceHistory} />}
    </div>
  );
}

const styles = {
  container: (theme) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2.5),
  }),
  heading: {
    display: "flex",
    alignItems: "center",
  },
  logo: (theme) => ({
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  }),
};
