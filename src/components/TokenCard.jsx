/** @jsxImportSource @emotion/react */
"use client";

import Image from "next/image";

import { formatPercent, formatPrice } from "@/utils/format";

export default function TokenCard({ onClick, token, isSelected = false }) {
  return (
    <button
      css={[styles.button, isSelected && styles.selected]}
      onClick={onClick}
    >
      <div css={styles.nameWrapper}>
        <Image
          src={token.image}
          alt={token.name}
          css={styles.icon}
          width={20}
          height={20}
        />
        <span>{token.name}</span>
      </div>
      <div css={styles.price}>
        {formatPrice(token.current_price)} (
        {formatPercent(token.price_change_percentage_24h)})
      </div>
    </button>
  );
}

const styles = {
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
    borderRadius: "50%",
  },
  price: (theme) => ({
    fontSize: theme.fontSizes.small,
    opacity: 0.8,
    paddingLeft: theme.spacing(3.5),
  }),
};
