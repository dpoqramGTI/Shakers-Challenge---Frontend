// components/FilterBar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Stack, Button } from "@mui/material";
import { FilterField } from "./FilterField";
import { NumberField } from "./NumberField";
import { SortOrderField } from "./SortOrderField";
import type { FilterValues } from "@/types";

interface FilterBarProps {
  specialtiesOptions: string[];
  skillsOptions: string[];
  projectTypesOptions: string[];
  industryOptions: string[];
  onApply: (filters: FilterValues) => void;
  onClear?: () => void;
  initialValues?: Partial<FilterValues>;
  applyButtonText?: string;
  clearButtonText?: string;
}

export default function FilterBar({
  specialtiesOptions,
  skillsOptions,
  projectTypesOptions,
  industryOptions,
  onApply,
  onClear,
  initialValues,
  applyButtonText = "Filtrar",
  clearButtonText = "Eliminar filtros",
}: FilterBarProps) {
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [projectTypes, setProjectTypes] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    if (initialValues) {
      setSpecialties(initialValues.specialties ?? []);
      setSkills(initialValues.skills ?? []);
      setProjectTypes(initialValues.projectTypes ?? []);
      setIndustries(initialValues.industries ?? []);
      setSortOrder(initialValues.sortOrder ?? "newest");
    }
  }, [initialValues]);

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      setSpecialties([]);
      setSkills([]);
      setProjectTypes([]);
      setIndustries([]);
      setSortOrder("newest");
    }
  };

  const handleApplyClick = () => {
    onApply({ specialties, skills, projectTypes, industries, sortOrder });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Filtrar Proyectos</Typography>
        <Grid container spacing={4}>
          {/* Especialidades */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1">Especialidades</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FilterField label="Especialidades" options={specialtiesOptions} selected={specialties} onChange={setSpecialties} />
              <NumberField value={specialties.length} />
            </Box>
          </Box>

          {/* Habilidades */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1">Habilidades</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FilterField label="Habilidades" options={skillsOptions} selected={skills} onChange={setSkills} />
              <NumberField value={skills.length} />
            </Box>
          </Box>

          {/* Tipo de proyecto */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1">Tipo de proyecto</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FilterField label="Tipo de proyecto" options={projectTypesOptions} selected={projectTypes} onChange={setProjectTypes} />
              <NumberField value={projectTypes.length} />
            </Box>
          </Box>

          {/* Industria */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1">Industria</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FilterField label="Industria" options={industryOptions} selected={industries} onChange={setIndustries} />
              <NumberField value={industries.length} />
            </Box>
          </Box>

          {/* Orden */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <SortOrderField value={sortOrder} onChange={setSortOrder} />
          </Box>
        </Grid>

        {/* Botones */}
        <Stack direction={{ xs: "column-reverse", sm: "row" }} spacing={2} justifyContent="center" alignItems={{ xs: "stretch", sm: "center" }}>
          <Button variant="text" color="error" onClick={handleClear} fullWidth sx={{ width: { xs: "100%", sm: "50%" } }}>
            {clearButtonText}
          </Button>
          <Button variant="contained" onClick={handleApplyClick} fullWidth sx={{ backgroundColor: "#033028", color: "#edf7f6", width: { xs: "100%", sm: "50%" }, "&:hover": { backgroundColor: "#033028e0" } }}>
            {applyButtonText}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
