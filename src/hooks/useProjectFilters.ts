// components/hooks/useProjectFilters.ts
"use client";
import { useState, useMemo } from "react";
import type { ProjectFilterValues } from "@/types";

/**
 * useProjectFilters
 * 
 * Hook para gestionar el estado local de filtros de proyectos.
 * El filtrado real se hace en backend; aquí solo se mantiene estado y handlers.
 */
export function useProjectFilters() {
  const [filters, setFilters] = useState<ProjectFilterValues>({
    specialties: [],
    skills: [],
    categories: [],
    industries: [],
    sortOrder: "newest",
  });

  // Si hay algún filtro aplicado (excepto sortOrder)
  const hasAnyFilter = useMemo(() => {
    return (
      filters.specialties.length > 0 ||
      filters.skills.length > 0 ||
      filters.categories.length > 0 ||
      filters.industries.length > 0
    );
  }, [filters]);

  const handleApply = (newFilters: ProjectFilterValues) => {
    setFilters(newFilters);
  };

  const handleClear = () => {
    setFilters({
      specialties: [],
      skills: [],
      categories: [],
      industries: [],
      sortOrder: "newest",
    });
  };

  const toggleSortOrder = () => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "newest" ? "oldest" : "newest",
    }));
  };

  const removeFilterValue = (
    category: keyof Omit<ProjectFilterValues, "sortOrder">,
    value: number,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }));
  };

  return {
    filters,
    hasAnyFilter,
    handleApply,
    handleClear,
    toggleSortOrder,
    removeFilterValue,
  };
}
