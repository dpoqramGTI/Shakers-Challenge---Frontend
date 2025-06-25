// components/toast/AppThemeProvider.tsx
"use client";

import { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery, useTheme } from "@mui/material";
import { Toaster } from "react-hot-toast";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
  },
  typography: {
    // ajustes si deseas
  },
});

export default function AppThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ResponsiveToaster />
      {children}
    </ThemeProvider>
  );
}

function ResponsiveToaster() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return <Toaster position={isMobile ? "top-center" : "top-right"} />;
}
