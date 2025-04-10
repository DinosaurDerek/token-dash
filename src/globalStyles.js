"use client";

import { css, Global } from "@emotion/react";

const styles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: system-ui, sans-serif;
    background-color: #0d1117;
    color: #e6edf3;
  }
`;

export const GlobalStyles = () => <Global styles={styles} />;
