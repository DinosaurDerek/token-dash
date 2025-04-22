/** @jsxImportSource @emotion/react */
"use client";

import AppHeader from "@/components/AppHeader";
import AppSidebar from "@/components/AppSidebar";

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
  main: (theme) => ({
    flex: 1,
    padding: theme.spacing(3),
  }),
};
