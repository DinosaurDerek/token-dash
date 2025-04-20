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
  container: {
    width: "220px",
    backgroundColor: "#161b22",
    padding: "16px",
    borderRight: "1px solid #30363d",
  },
};
