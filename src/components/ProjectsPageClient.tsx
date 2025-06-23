// pages/ProjectsPageClient.tsx
"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import ProjectsListClient from "@/components/ProjectsListClient";
import { FilterDialog } from "@/components/FilterDialog";
import { FilterDisplayOnList } from "@/components/FilterDisplayOnList";
import { AppliedFilters } from "@/components/AppliedFilters";
import { useProjectFilters } from "@/hooks/useProjectFilters";
import type { Project } from "@/types";
import { Box } from "@mui/material";

interface Props {
  initialProjects: Project[];
}

export default function ProjectsPageClient({ initialProjects }: Props) {
  const [openFilter, setOpenFilter] = useState(false);
  const {
    filters,
    specialtiesOptions,
    skillsOptions,
    projectTypesOptions,
    industryOptions,
    filteredProjects,
    hasAnyFilter,
    handleApply,
    handleClear,
    toggleSortOrder,
    removeFilterValue,
  } = useProjectFilters(initialProjects);

  return (
    <>
      <Navbar />
      <FilterDisplayOnList
        onOpenFilter={() => setOpenFilter(true)}
        sortOrder={filters.sortOrder}
        onToggleSort={toggleSortOrder}
      />
      {/* Centered AppliedFilters with full width up to maxWidth */}
      {hasAnyFilter && (
        <Box sx={{ display: { xs: "none", sm: "flex" }, justifyContent: "center", maxWidth: "1200px", mx: "auto", width: "100%", px: 1 }}>
          <AppliedFilters
            filters={filters}
            onRemove={removeFilterValue}
          />
        </Box>
      )}
      <FilterDialog
        open={openFilter}
        onClose={() => setOpenFilter(false)}
        onApply={(f) => {
          handleApply(f);
          setOpenFilter(false);
        }}
        onClear={() => {
          handleClear();
          setOpenFilter(false);
        }}
        initialValues={filters}
        specialtiesOptions={specialtiesOptions}
        skillsOptions={skillsOptions}
        projectTypesOptions={projectTypesOptions}
        industryOptions={industryOptions}
      />
      <ProjectsListClient initialProjects={filteredProjects} />
    </>
  );
}
