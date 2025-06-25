// components/projectList/ListWrapper.tsx
"use client";
import React, { useCallback, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Modal } from "@/components/filters/Modal";
import { DisplayButtons } from "@/components/filters/DisplayButtons";
import { AppliedFilters } from "@/components/filters/AppliedFilters";
import { useProjectsPaging } from "@/hooks/useProjectsPaging";
import { PageContent } from "@/components/projectList/PageContent";
import { useProjectOptions } from "@/hooks/useProjectOptions";

/**
 * ListWrapper
 *
 * Contenedor para manejar paginación, filtros y estados de carga en lista de proyectos.
 */
export const ListWrapper: React.FC = () => {
  const {
    data,
    loading,
    error,
    filters,
    handlePageChange,
    handleApplyFilters,
    handleClearFilters,
    toggleSortOrder,
    handleRemoveFilter,
  } = useProjectsPaging();

  const {
    skillsOptions,
    specialtiesOptions,
    categoriesOptions,
    industryOptions,
    loading: loadingOpts,
    error: errorOpts,
  } = useProjectOptions();

  const [openFilter, setOpenFilter] = useState(false);

  const handleToggleSort = useCallback(() => {
    toggleSortOrder();
  }, [toggleSortOrder]);

  if (loadingOpts) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorOpts) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography color="error">Error cargando las opciones de filtro</Typography>
      </Box>
    );
  }

  return (
    <>
      <DisplayButtons
        onOpenFilter={() => setOpenFilter(true)}
        sortOrder={filters.sortOrder}
        onToggleSort={handleToggleSort}
      />

      {(filters.specialties.length +
        filters.skills.length +
        filters.categories.length +
        filters.industries.length) > 0 && (
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "center",
            maxWidth: "1440px",
            mx: "auto",
            width: "100%",
          }}
        >
          <AppliedFilters
            filters={filters}
            onRemove={handleRemoveFilter}
            specialtiesOptions={specialtiesOptions}
            skillsOptions={skillsOptions}
            categoriesOptions={categoriesOptions}
            industryOptions={industryOptions}
          />
        </Box>
      )}

      <Modal
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onApply={(vals) => {
          handleApplyFilters(vals);
          setOpenFilter(false);
        }}
        onClear={() => {
          handleClearFilters();
          setOpenFilter(false);
        }}
        initialValues={filters}
        specialtiesOptions={specialtiesOptions}
        skillsOptions={skillsOptions}
        categoriesOptions={categoriesOptions}
        industryOptions={industryOptions}
      />

      <PageContent
        loading={loading}
        error={error}
        projects={data?.items || []}
        data={data}
        onPageChange={(_, page) => handlePageChange(page)}
      />
    </>
  );
};
