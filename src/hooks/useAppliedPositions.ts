// components/hooks/useAppliedPositions.ts
import { useEffect, useState } from "react";

/**
 * useAppliedPositions
 * 
 * Hook para gestionar posiciones aplicadas guardadas en localStorage.
 * Devuelve el set de posiciones aplicadas y funciones para añadir,
 * eliminar y verificar.
 */
export function useAppliedPositions() {
  const [appliedPositions, setAppliedPositions] = useState<Set<number>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("appliedPositions");
    if (saved) {
      setAppliedPositions(new Set(JSON.parse(saved)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appliedPositions", JSON.stringify(Array.from(appliedPositions)));
  }, [appliedPositions]);

  const apply = (id: number) => setAppliedPositions((prev) => new Set(prev).add(id));
  const withdraw = (id: number) => {
    const next = new Set(appliedPositions);
    next.delete(id);
    setAppliedPositions(next);
  };
  const isApplied = (id: number) => appliedPositions.has(id);

  return { appliedPositions, apply, withdraw, isApplied };
}
