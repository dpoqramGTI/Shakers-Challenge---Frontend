// components/filter/Form.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Stack, Button } from "@mui/material";
import { CustomChipSelector } from "./CustomChipSelector";
import { NumberField } from "./NumberField";
import { SortOrderField } from "./SortOrderField";
import { FilterBarProps } from "@/types";

/**
 * Form
 * 
 * Formulario de filtros para proyectos con selección múltiple para
 * especialidades, habilidades, categorías e industria, y orden de publicación.
 * Incluye botones para aplicar y limpiar filtros.
 * 
 * Props:
 * - specialtiesOptions, skillsOptions, categoriesOptions, industryOptions: listas de opciones
 * - onApply: callback con valores actuales al aplicar filtros
 * - onClear: callback para limpiar filtros
 * - initialValues: valores iniciales para el formulario
 * - applyButtonText, clearButtonText: texto para botones (opcionales)
 */
export default function Form({
  specialtiesOptions,
  skillsOptions,
  categoriesOptions,
  industryOptions,
  onApply,
  onClear,
  initialValues,
  applyButtonText = "Filtrar",
  clearButtonText = "Eliminar filtros",
}: FilterBarProps) {
  // Estados locales para los filtros seleccionados y orden
  const [specialties, setSpecialties] = useState<number[]>([]);
  const [skills, setSkills] = useState<number[]>([]);
  const [categories, setCategories] = useState<number[]>([]);
  const [industries, setIndustries] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Inicializa estados con valores iniciales cuando cambian
  useEffect(() => {
    if (initialValues) {
      setSpecialties(initialValues.specialties ?? []);
      setSkills(initialValues.skills ?? []);
      setCategories(initialValues.categories ?? []);
      setIndustries(initialValues.industries ?? []);
      setSortOrder(initialValues.sortOrder ?? "newest");
    }
  }, [initialValues]);

  // Limpia filtros (usando callback o reseteando estados)
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      setSpecialties([]);
      setSkills([]);
      setCategories([]);
      setIndustries([]);
      setSortOrder("newest");
    }
  };

  // Aplica filtros actuales
  const handleApplyClick = () => {
    onApply({ specialties, skills, categories, industries, sortOrder });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5">Filtrar Proyectos</Typography>
        <Grid container spacing={4}>
          {/* Selector múltiple + contador para cada categoría */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1">Especialidades</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CustomChipSelector
                label="Especialidades"
                options={specialtiesOptions}
                selected={specialties}
                onChange={setSpecialties}
              />
              <NumberField value={specialties.length} />
            </Box>
          </Box>

          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1">Habilidades</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CustomChipSelector
                label="Habilidades"
                options={skillsOptions}
                selected={skills}
                onChange={setSkills}
              />
              <NumberField value={skills.length} />
            </Box>
          </Box>

          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1">Tipo de proyecto</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CustomChipSelector
                label="Tipo de proyecto"
                options={categoriesOptions}
                selected={categories}
                onChange={setCategories}
              />
              <NumberField value={categories.length} />
            </Box>
          </Box>

          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1">Industria</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <CustomChipSelector
                label="Industria"
                options={industryOptions}
                selected={industries}
                onChange={setIndustries}
              />
              <NumberField value={industries.length} />
            </Box>
          </Box>

          {/* Selector para orden de publicación */}
          <Box sx={{ width: "100%", mb: 2 }}>
            <SortOrderField value={sortOrder} onChange={setSortOrder} />
          </Box>
        </Grid>

        {/* Botones para limpiar y aplicar filtros */}
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Button
            variant="text"
            color="error"
            onClick={handleClear}
            fullWidth
            sx={{ width: { xs: "100%", sm: "50%" } }}
          >
            {clearButtonText}
          </Button>
          <Button
            variant="contained"
            onClick={handleApplyClick}
            fullWidth
            sx={{
              backgroundColor: "#033028",
              color: "#edf7f6",
              width: { xs: "100%", sm: "50%" },
              "&:hover": { backgroundColor: "#033028e0" },
            }}
          >
            {applyButtonText}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
