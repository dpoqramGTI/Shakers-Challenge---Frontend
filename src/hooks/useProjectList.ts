// components/hooks/useProjectList.ts
import { useState, useEffect, useCallback } from "react";
import type { ProjectQueryParams, ProjectListResponse } from "@/types";

/**
 * useProjectList
 * 
 * Hook para obtener lista de proyectos con filtros, paginación y orden.
 * @param params Query params para filtrar y paginar
 * @param enabled Permite activar/desactivar el fetch
 */
export function useProjectList(
  params: ProjectQueryParams = {},
  enabled: boolean = true,
) {
  const [data, setData] = useState<ProjectListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    try {
      const query = new URLSearchParams();
      const sortParam = params.sort === "oldest" ? "creationDate:asc" : "creationDate:desc";
      if (params.sort) query.set("sort", sortParam);
      if (params.page != null) query.set("page", String(params.page - 1)); // page 1-indexed
      if (params.limit != null) query.set("limit", String(params.limit));
      if (params.subcategory) query.set("subcategory", params.subcategory);
      if (params.minBudget != null) query.set("minBudget", String(params.minBudget));
      if (params.maxBudget != null) query.set("maxBudget", String(params.maxBudget));

      (params.categories || []).forEach((cat) => query.append("categories", String(cat)));
      (params.skills || []).forEach((skill) => query.append("skills", String(skill)));
      (params.specialties || []).forEach((spec) => query.append("specialties", String(spec)));
      (params.industries || []).forEach((ind) => query.append("industries", String(ind)));

      const base = process.env.NEXT_PUBLIC_API_URL || "";
      const url = `${base}/projects?${query.toString()}`;
      console.log("Fetching projects from:", url);

      const res = await fetch(url);
      const contentType = res.headers.get("content-type") || "";

      if (!res.ok) {
        const text = await res.text();
        console.error("Error response body:", text);
        throw new Error(`Error fetching projects: ${res.status} ${res.statusText}`);
      }
      if (!contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Expected JSON but got:", text);
        throw new Error("Unexpected response format, se esperaba JSON");
      }
      const json = await res.json();
      console.log("Fetched projects:", json);
      setData(json as ProjectListResponse);
    } catch (err) {
      console.error("useProjectList error:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [params, enabled]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { data, loading, error, refetch: fetchProjects };
}
