// components/hooks/useProjectsPaging.ts
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import type { ProjectFilterValues, ProjectQueryParams } from "@/types";
import { useProjectList } from "./useProjectList";

/**
 * Parsea un array de strings a números, ignorando valores no numéricos.
 */
function parseNumberArray(param: string[] | null): number[] {
  if (!param) return [];
  return param
    .map((s) => {
      const n = Number(s);
      return isNaN(n) ? null : n;
    })
    .filter((n): n is number => n !== null);
}

/**
 * useProjectsPaging
 * 
 * Hook que sincroniza filtros y paginación con la URL, y llama useProjectList.
 * Devuelve data, loading, error, y handlers para cambiar página y filtros.
 */
export function useProjectsPaging(defaultLimit = 10) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [filters, setFilters] = useState<ProjectFilterValues>({
    specialties: [],
    skills: [],
    categories: [],
    industries: [],
    sortOrder: "newest",
  });
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(defaultLimit);

  // Cuando cambia searchParams, sincronizar estado local con URL
  useEffect(() => {
    const sp = searchParams;
    const pageParam = sp.get("page");
    const pageNum = pageParam ? parseInt(pageParam, 10) : 1;

    const specialtiesParams = sp.getAll("specialties");
    const skillsParams = sp.getAll("skills");
    const projectTypesParams = sp.getAll("categories");
    const industriesParams = sp.getAll("industries");
    const sortParam = sp.get("sortOrder") || sp.get("sort") || "newest";
    const sortOrder = sortParam === "oldest" ? "oldest" : "newest";

    setPage(pageNum);
    setFilters({
      specialties: parseNumberArray(specialtiesParams),
      skills: parseNumberArray(skillsParams),
      categories: parseNumberArray(projectTypesParams),
      industries: parseNumberArray(industriesParams),
      sortOrder,
    });
  }, [searchParams]);

  const buildQueryParams = useCallback((): ProjectQueryParams => {
    const params: ProjectQueryParams = { page, limit };
    if (filters.sortOrder) params.sort = filters.sortOrder;
    if (filters.industries.length > 0) params.industries = filters.industries;
    if (filters.skills.length > 0) params.skills = filters.skills;
    if (filters.specialties.length > 0) params.specialties = filters.specialties;
    if (filters.categories.length > 0) params.categories = filters.categories;
    return params;
  }, [filters, page, limit]);

  const queryParams = useMemo(() => buildQueryParams(), [buildQueryParams]);
  const { data, loading, error, refetch } = useProjectList(queryParams, true);

  // Cambia página y actualiza URL
  const handlePageChange = useCallback(
    (newPage: number) => {
      const sp = new URLSearchParams(searchParams.toString());
      sp.set("page", String(newPage));
      router.push(`${pathname}?${sp.toString()}`);
    },
    [router, pathname, searchParams],
  );

  // Aplica nuevos filtros y resetea página en URL
  const handleApplyFilters = useCallback(
    (newFilters: ProjectFilterValues) => {
      const sp = new URLSearchParams();
      sp.set("page", "1");
      sp.set("sortOrder", newFilters.sortOrder);
      newFilters.specialties.forEach((id) => sp.append("specialties", String(id)));
      newFilters.skills.forEach((id) => sp.append("skills", String(id)));
      newFilters.categories.forEach((id) => sp.append("categories", String(id)));
      newFilters.industries.forEach((id) => sp.append("industries", String(id)));

      router.push(`${pathname}?${sp.toString()}`);
    },
    [router, pathname],
  );

  // Limpia filtros y resetea página en URL
  const handleClearFilters = useCallback(() => {
    const sp = new URLSearchParams();
    sp.set("page", "1");
    sp.set("sortOrder", "newest");
    router.push(`${pathname}?${sp.toString()}`);
  }, [router, pathname]);

  // Alterna orden y actualiza URL
  const toggleSortOrder = useCallback(() => {
    const newSort = filters.sortOrder === "newest" ? "oldest" : "newest";
    const sp = new URLSearchParams(searchParams.toString());
    sp.set("page", "1");
    sp.set("sortOrder", newSort);
    router.push(`${pathname}?${sp.toString()}`);
  }, [filters.sortOrder, router, pathname, searchParams]);

  // Elimina un filtro concreto y actualiza URL
  const handleRemoveFilter = useCallback(
    (category: keyof Omit<ProjectFilterValues, "sortOrder">, value: number) => {
      const sp = new URLSearchParams(searchParams.toString());
      const key = category;
      const existing = sp.getAll(key);
      const updated = existing.filter((v) => v !== String(value));
      sp.delete(key);
      updated.forEach((v) => sp.append(key, v));
      sp.set("page", "1");
      router.push(`${pathname}?${sp.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return {
    data,
    loading,
    error,
    filters,
    page,
    handlePageChange,
    handleApplyFilters,
    handleClearFilters,
    toggleSortOrder,
    handleRemoveFilter,
    refetch,
  };
}
