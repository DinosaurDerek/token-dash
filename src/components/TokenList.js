/** @jsxImportSource @emotion/react */
"use client";

import { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";

import { formatPercent, formatPrice } from "@/utils/format";
import { fetchTokens } from "@/utils/fetchTokens";
import { useToken } from "@/context/TokenContext";
import Message from "@/components/Message";
import Loader from "@/components/Loader";

export default function TokenList() {
  const { selectedToken, setSelectedToken } = useToken();
  const [tokens, setTokens] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const response = await fetchTokens(setError);
        setTokens(response);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch top tokens:", err);
        setError(err);
      }
    };

    loadTokens();
  }, []);

  return (
    <div css={styles.container}>
      <h2 css={styles.heading}>Top Tokens</h2>
      {error && (
        <div>
          <Message text={error.message} />
          <Loader />
        </div>
      )}
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
            <div css={styles.nameWrapper}>
              <img src={token.image} alt={token.name} css={styles.icon} />
              <span>{token.name}</span>
            </div>
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

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
    opacity: 0,
    transform: "translateY(4px)",
    animation: `${fadeInUp} 800ms ease-out forwards`,
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
  nameWrapper: (theme) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  }),
  icon: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    objectFit: "cover",
  },
  price: (theme) => ({
    fontSize: theme.fontSizes.small,
    opacity: 0.8,
    paddingLeft: theme.spacing(3.5),
  }),
};
