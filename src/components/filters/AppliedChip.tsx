// components/filter/AppliedChip.tsx
import React from "react";
import { Chip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface FilterChipProps {
  label: string;
  onDelete: () => void;
}

/**
 * AppliedChip
 * 
 * Chip personalizado que muestra una etiqueta con opción de borrado.
 * El icono de borrar es un CloseIcon gris pequeño.
 * 
 * Props:
 * - label: texto que se muestra en el chip
 * - onDelete: función que se ejecuta al borrar el chip
 */
export const AppliedChip: React.FC<FilterChipProps> = ({ label, onDelete }) => {
  return (
    <Chip
      label={label}
      size="small"
      onDelete={onDelete}
      deleteIcon={
        <CloseIcon
          sx={{
            fontSize: "0.85rem",
            width: 16,
            height: 16,
          }}
        />
      }
      sx={{
        backgroundColor: "white",
        color: "#033028",
        borderRadius: 1,
        padding: "0.8rem 0.5rem",
        "& .MuiChip-deleteIcon": {
          margin: 0,
          color: "gray",  // Icono borrar en gris
        },
      }}
    />
  );
};
