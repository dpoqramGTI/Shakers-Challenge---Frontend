// components/ProjectDetail/BreadcrumbNav.tsx
import React from "react";
import { Stack, Breadcrumbs, Typography, Link as MuiLink } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BreadcrumbNavProps {
  title: string;
}
export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ title }) => (
  <Stack direction="row" gap={2} alignItems="center" sx={{ mb: 2 }}>
    <MuiLink component="button" variant="body2" onClick={() => window.history.back()} sx={{ color: "#033028", textDecoration: "none", display: "flex", alignItems: "center" }}>
      <ArrowBackIcon fontSize="small" sx={{ mr: 0.5 }} />
      Atrás
    </MuiLink>
    <Breadcrumbs aria-label="breadcrumb">
      <MuiLink underline="hover" color="inherit" href="/projects">
        Buscador Proyectos
      </MuiLink>
      <Typography color="text.primary" fontStyle="italic" fontWeight="bold">
        {title}
      </Typography>
    </Breadcrumbs>
  </Stack>
);
