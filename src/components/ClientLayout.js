"use client";

import { useEffect, useState } from "react";
import { ThemeProvider, Global, css } from "@emotion/react";
import { theme } from "@/theme";
import { GlobalStyles } from "@/globalStyles";

export default function ClientLayout({ children }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {isClient && <GlobalStyles />}
      {children}
    </ThemeProvider>
  );
}
