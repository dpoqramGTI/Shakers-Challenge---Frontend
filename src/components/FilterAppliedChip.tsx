
// components/FilterAppliedChip.tsx
import React from "react";
import { Chip, Box } from "@mui/material";

interface FilterChipProps {
  label: string;
  onDelete: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, onDelete }) => {
  const chipStyle = {
    backgroundColor: "white",
    color: "#033028",
    borderRadius: 1,
    py: 2,
  };
  const deleteIconStyle = {
    color: "#033028 !important",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 16,
    height: 16,
    fontSize: "0.75rem !important",
    lineHeight: 1,
    cursor: "pointer",
    "&:hover": {
      fontWeight: "bold",
    },
    pl: 1,
    pr: 0.5,
  };
  return (
    <Chip
      key={label}
      label={label}
      size="small"
      onDelete={onDelete}
      deleteIcon={<Box sx={deleteIconStyle}>X</Box>}
      sx={chipStyle}
    />
  );
};
