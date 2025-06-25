// components/hooks/useProjectDetail.ts
import { useState, useEffect, useCallback } from "react";
import type { RawProject, Project } from "@/types";
import { transformRawProject } from "@/utils/transform";

interface UseProjectDetailResult {
  data: Project | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * useProjectDetail
 *
 * Hook para obtener detalle de proyecto por ID, con estados de carga y error.
 * 
 * @param id ID del proyecto
 * @param enabled Si el hook debe hacer fetch (default: true)
 */
export function useProjectDetail(
  id: number | string | null,
  enabled: boolean = true,
): UseProjectDetailResult {
  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!enabled) return;
    if (id == null || id === "") {
      setData(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const base = process.env.NEXT_PUBLIC_API_URL || "";
      const url = `${base}/projects/${id}`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Error fetching project ${id}: ${res.status} ${res.statusText}`);
      }
      const raw: RawProject = await res.json();
      const project = transformRawProject(raw);
      setData(project);
    } catch (err) {
      console.error("useProjectDetail error:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [id, enabled]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { data, loading, error, refetch: fetchDetail };
}
