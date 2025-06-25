// components/toast/ClientToaster.tsx
"use client";

import { Toaster } from "react-hot-toast";
import { useMediaQuery, useTheme } from "@mui/material";

export function ClientToaster() {
  const theme = useTheme();

  // Detecta si es móvil (xs / sm)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Toaster position={isMobile ? "top-center" : "top-right"} />
  );
}
