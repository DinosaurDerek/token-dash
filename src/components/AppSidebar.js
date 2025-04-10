/** @jsxImportSource @emotion/react */
"use client";

export default function AppSidebar() {
  return (
    <aside css={styles.container}>
      <p>Filters</p>
      {/* Later: chain filter, category, etc */}
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
