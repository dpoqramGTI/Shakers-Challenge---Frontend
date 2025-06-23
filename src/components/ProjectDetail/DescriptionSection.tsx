// components/ProjectDetail/DescriptionSection.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

interface DescriptionSectionProps {
  description: string;
}
export const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => (
  <Box sx={{ my: 3 }}>
    <Typography variant="h6" sx={{ color: "#033028" }}>Descripción del Proyecto</Typography>
    <Typography variant="body1" sx={{ mt: 1, color: "dimgray" }}>{description}</Typography>
  </Box>
);
