// components/filter/SortOrderField.tsx
import React from "react";
import { FormLabel, RadioGroup, FormControlLabel, Radio, Typography, Box } from "@mui/material";

interface SortOrderFieldProps {
  value: "newest" | "oldest";
  onChange: (value: "newest" | "oldest") => void;
}

/**
 * SortOrderField
 * 
 * Selector de radio para elegir el orden de publicación de proyectos:
 * "Más reciente primero" o "Más antiguo primero".
 * 
 * Props:
 * - value: valor actual ("newest" o "oldest")
 * - onChange: callback al cambiar selección
 */
export function SortOrderField({ value, onChange }: SortOrderFieldProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <FormLabel component="legend">Ordenar por</FormLabel>
      <RadioGroup row value={value} onChange={(e) => onChange(e.target.value as "newest" | "oldest")}>
        <FormControlLabel
          value="newest"
          control={<Radio sx={{ "&.Mui-checked": { color: "#033028" } }} />}
          label={
            <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
              Fecha de publicación (Más reciente primero)
            </Typography>
          }
        />
        <FormControlLabel
          value="oldest"
          control={<Radio sx={{ "&.Mui-checked": { color: "#033028" } }} />}
          label={
            <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}>
              Fecha de publicación (Más antiguo primero)
            </Typography>
          }
        />
      </RadioGroup>
    </Box>
  );
}
