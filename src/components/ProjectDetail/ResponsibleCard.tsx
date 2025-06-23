// components/ProjectDetail/ResponsibleCard.tsx
import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import Image from "next/image";
import type { Organization, Person } from "@/types";
import imagenNav from "@/images/imagenNav.webp";

interface ResponsibleCardProps {
  organization: Organization;
  leader: Person;
}
export const ResponsibleCard: React.FC<ResponsibleCardProps> = ({ organization, leader }) => (
  <Paper sx={{ p: 3, flex: 1, border: "1px solid #e6e6e6", boxShadow: "none", borderRadius: 3, position: "inherit" }}>
    <Stack direction="column" spacing={2} alignItems="center">
      <Box sx={{ width: "100%", gap: 1.5, display: "flex", alignItems: "center" }}>
        <Image src={organization.logo} alt={organization.name} width={25} height={25} style={{ borderRadius: "0.25rem" }} />
        <Typography variant="subtitle2">{organization.name}</Typography>
      </Box>
      <Box sx={{ width: "100%", position: "relative", paddingTop: "100%", borderRadius: "0.25rem", overflow: "hidden" }}>
        <Image src={imagenNav} alt={`${leader.name} ${leader.lastName}`} fill style={{ objectFit: "contain" }} />
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant="body2" fontWeight="bold">{leader.name} {leader.lastName}</Typography>
        <Typography variant="caption">Project Owner</Typography>
      </Box>
    </Stack>
  </Paper>
);
