
// components/NumberField.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMoreSharp";

interface NumberFieldProps {
  value?: number;
  onClick?: () => void;
}
export function NumberField({ value }: NumberFieldProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.25,
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ccc",
        borderRadius: 1,
        width: "3.75rem",
        py: 1.1,
        pl: 2,
        pr: 1.5,
        "&:hover": { borderColor: "#033028" },
      }}
    >
      <Typography variant="body2" sx={{ lineHeight: 1, fontSize: "1rem" }}>
        {value ?? 0}
      </Typography>
      <UnfoldMoreIcon
        fontSize="small"
        sx={{ ml: 0.25, color: "gray", "&:hover": { backgroundColor: "#0000000a", borderRadius: "50%" } }}
      />
    </Box>
  );
}
