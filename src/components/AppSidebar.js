/** @jsxImportSource @emotion/react */
"use client";

import TokenList from "./TokenList";

export default function AppSidebar() {
  return (
    <aside css={styles.container}>
      <TokenList />
    </aside>
  );
}

const styles = {
  container: (theme) => ({
    minWidth: "200px",
    backgroundColor: theme.colors.backgroundSecondary,
    padding: theme.spacing(2),
    borderRight: theme.border,
    height: `calc(100vh - ${theme.spacing(9)})`, // adjust for header height
    overflowY: "auto",
  }),
};
