/** @jsxImportSource @emotion/react */
"use client";

import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

export default function AppLayout({ children }) {
  return (
    <div css={styles.container}>
      <AppHeader />
      <div css={styles.content}>
        <AppSidebar />
        <main css={styles.main}>{children}</main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    display: "flex",
    flex: 1,
  },
  main: {
    flex: 1,
    padding: "24px",
  },
};
