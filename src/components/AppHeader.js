/** @jsxImportSource @emotion/react */
"use client";

export default function AppHeader() {
  return (
    <header css={styles.container}>
      <h1>Token Dash</h1>
    </header>
  );
}

const styles = {
  container: {
    backgroundColor: "#161b22",
    padding: "16px 24px",
    color: "#e6edf3",
    borderBottom: "1px solid #30363d",
  },
};
