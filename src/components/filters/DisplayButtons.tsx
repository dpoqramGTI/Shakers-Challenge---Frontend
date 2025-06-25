// components/filter/DisplayButtons.tsx
import React from "react";
import { Box, Button } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface FilterBarProps {
  onOpenFilter: () => void;
  sortOrder: string;
  onToggleSort: () => void;
}

/**
 * DisplayButtons
 * 
 * Barra con botones para abrir el filtro y cambiar el orden de publicación.
 * - Botón "Filtrar" dispara onOpenFilter.
 * - Botón "Publicación" cambia orden asc/desc y muestra icono correspondiente.
 */
export const DisplayButtons: React.FC<FilterBarProps> = ({ onOpenFilter, sortOrder, onToggleSort }) => (
  <Box
    sx={{
      px: 0,
      display: "flex",
      gap: 1,
      justifyContent: "flex-end",
      flexWrap: "wrap",
    }}
  >
    <Button
      variant="text"
      startIcon={<FilterAltIcon />}
      onClick={onOpenFilter}
      sx={{ color: "#033028", "&:hover": { backgroundColor: "#d0efea" } }}
    >
      Filtrar
    </Button>
    <Button
      variant="outlined"
      startIcon={
        sortOrder === "newest" ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />
      }
      onClick={onToggleSort}
      sx={{
        color: "#033028",
        borderColor: "#033028",
        "&:hover": { backgroundColor: "#d0efea", borderColor: "#033028" },
      }}
    >
      Publicación
    </Button>
  </Box>
);
