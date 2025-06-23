// hooks/useProjectFilters.ts
import { useState, useMemo, useCallback } from "react";
import type { Project, FilterValues } from "@/types";

export function useProjectFilters(initialProjects: Project[]) {
  const [filters, setFilters] = useState<FilterValues>({
    specialties: [],
    skills: [],
    projectTypes: [],
    industries: [],
    sortOrder: "newest",
  });

  const specialtiesOptions = useMemo(() => {
    const setOps = new Set<string>();
    initialProjects.forEach((proj) =>
      proj.positions.forEach((pos) =>
        pos.specialties.forEach((s) => setOps.add(s)),
      ),
    );
    return Array.from(setOps);
  }, [initialProjects]);

  const skillsOptions = useMemo(() => {
    const setOps = new Set<string>();
    initialProjects.forEach((proj) =>
      proj.positions.forEach((pos) =>
        pos.skills.forEach((s) => setOps.add(s)),
      ),
    );
    return Array.from(setOps);
  }, [initialProjects]);

  const projectTypesOptions = useMemo(() => {
    const setOps = new Set<string>();
    initialProjects.forEach((proj) =>
      setOps.add(`${proj.category} > ${proj.subcategory}`),
    );
    return Array.from(setOps);
  }, [initialProjects]);

  const industryOptions = useMemo(() => {
    const setOps = new Set<string>();
    initialProjects.forEach((proj) => setOps.add(proj.organization.industry));
    return Array.from(setOps);
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    return initialProjects
      .filter((proj) => {
        if (
          filters.specialties.length > 0 &&
          !proj.positions.some((pos) =>
            pos.specialties.some((s) => filters.specialties.includes(s)),
          )
        )
          return false;
        if (
          filters.skills.length > 0 &&
          !proj.positions.some((pos) =>
            pos.skills.some((s) => filters.skills.includes(s)),
          )
        )
          return false;
        if (
          filters.projectTypes.length > 0 &&
          !filters.projectTypes.includes(
            `${proj.category} > ${proj.subcategory}`,
          )
        )
          return false;
        if (
          filters.industries.length > 0 &&
          !filters.industries.includes(proj.organization.industry)
        )
          return false;
        return true;
      })
      .sort((a, b) => {
        const da = new Date(a.publishedAt).getTime();
        const db = new Date(b.publishedAt).getTime();
        return filters.sortOrder === "newest" ? db - da : da - db;
      });
  }, [initialProjects, filters]);

  const hasAnyFilter = useMemo(
    () =>
      filters.specialties.length > 0 ||
      filters.skills.length > 0 ||
      filters.projectTypes.length > 0 ||
      filters.industries.length > 0,
    [filters],
  );

  const handleApply = useCallback((newFilters: FilterValues) => {
    setFilters(newFilters);
  }, []);

  const handleClear = useCallback(() => {
    setFilters({
      specialties: [],
      skills: [],
      projectTypes: [],
      industries: [],
      sortOrder: "newest",
    });
  }, []);

  const toggleSortOrder = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === "newest" ? "oldest" : "newest",
    }));
  }, []);

  const removeFilterValue = useCallback((category: keyof Omit<FilterValues, "sortOrder">, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((i) => i !== value),
    }));
  }, []);

  return {
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
  };
}
