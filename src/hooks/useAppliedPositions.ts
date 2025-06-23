// hooks/useAppliedPositions.ts
import { useEffect, useState } from "react";

export function useAppliedPositions() {
  const [appliedPositions, setAppliedPositions] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Aquí es seguro acceder a localStorage
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
