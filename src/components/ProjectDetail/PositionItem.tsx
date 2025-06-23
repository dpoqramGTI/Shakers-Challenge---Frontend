// components/ProjectDetail/PositionItem.tsx
import React from "react";
import { Paper, Typography, Chip, Button } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import type { Position } from "@/types";

interface PositionItemProps {
  position: Position;
  isApplied: boolean;
  onApply: (id: number) => void;
  onWithdraw: (id: number) => void;
}
export const PositionItem: React.FC<PositionItemProps> = ({ position, isApplied, onApply, onWithdraw }) => (
  <Paper sx={{ p: 3, border: "1px solid #e6e6e6", boxShadow: "none", borderRadius: 3, position: "inherit" }}>
    {isApplied && (
      <Chip icon={<CheckOutlinedIcon />} label="Aplicado" size="small" sx={{ bgcolor: "#f8f9ec", mb: 2, fontWeight: "bold", borderRadius: 2, padding: "1rem 0.5rem !important" }} />
    )}
    <Typography variant="subtitle2" fontWeight="600" fontSize="1rem" gutterBottom>{position.title}</Typography>
    <Typography variant="body2" gutterBottom>{position.skills.join(", ")}</Typography>
    <Button variant={isApplied ? "outlined" : "contained"} sx={{ mt: 3, width: "100%", boxShadow: "none", bgcolor: isApplied ? "transparent" : "#edf700", color: isApplied ? "#d32f2f" : "#033028", borderColor: isApplied ? "#d32f2f" : "transparent", "&:hover": { bgcolor: isApplied ? "rgba(211, 47, 47, 0.04)" : "#e0e600", borderColor: isApplied ? "#d32f2f" : "transparent" } }} onClick={() => isApplied ? onWithdraw(position.id) : onApply(position.id)}>
      {isApplied ? "Retirar candidatura" : "Aplicar"}
    </Button>
  </Paper>
);
