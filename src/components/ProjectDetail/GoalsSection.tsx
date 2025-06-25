// components/ProjectDetail/GoalsSection.tsx
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

interface GoalsSectionProps {
  goals: string[];
}

/**
 * GoalsSection
 * 
 * Props:
 * - goals: array con objetivos o tareas del proyecto
 * 
 * Lista de objetivos y tareas del proyecto con iconos de check.
 * Muestra mensaje alternativo si no hay objetivos definidos.
 */
export const GoalsSection: React.FC<GoalsSectionProps> = ({ goals }) => (
  <Box sx={{ my: 3 }}>
    <Typography variant="h6" sx={{ color: "#033028" }}>¿Cuáles son los objetivos y tareas a realizar?</Typography>
    {goals.length > 0 ? (
      <Stack spacing={1} sx={{ mt: 1 }}>
        {goals.map((goal, idx) => (
          <Box key={idx} sx={{ display: "flex", alignItems: "center" }}>
            <CheckOutlinedIcon sx={{ color: "#033028", mr: 1 }} fontSize="small" />
            <Typography variant="body2">{goal}</Typography>
          </Box>
        ))}
      </Stack>
    ) : (
      <Typography variant="body1" sx={{ mt: 1, color: "dimgray" }}>No se han definido objetivos.</Typography>
    )}
  </Box>
);
