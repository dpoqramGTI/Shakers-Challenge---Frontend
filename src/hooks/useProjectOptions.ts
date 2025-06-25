// components/hooks/useProjectOptions.ts
import { useState, useEffect } from "react";

type OptionItem = {
  id: number;
  name: string;
};

type CategoryItem = {
  id: number;
  name: string;
  subcategories?: OptionItem[];
};

/**
 * useProjectOptions
 * 
 * Hook que obtiene opciones para filtros: skills, specialties, industries y categorías.
 */
export function useProjectOptions() {
  const [skillsOptions, setSkillsOptions] = useState<OptionItem[]>([]);
  const [specialtiesOptions, setSpecialtiesOptions] = useState<OptionItem[]>([]);
  const [industryOptions, setIndustryOptions] = useState<OptionItem[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<OptionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchOptions() {
      setLoading(true);
      setError(null);
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

        const [skillsRes, specialtiesRes, industriesRes, categoriesRes] = await Promise.all([
          fetch(`${base}/skills`),
          fetch(`${base}/specialties`),
          fetch(`${base}/industries`),
          fetch(`${base}/categories`),
        ]);

        if (!skillsRes.ok || !specialtiesRes.ok || !industriesRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch one or more project options");
        }

        const skillsData: OptionItem[] = await skillsRes.json();
        const specialtiesData: OptionItem[] = await specialtiesRes.json();
        const industriesData: OptionItem[] = await industriesRes.json();
        const categoriesData: CategoryItem[] = await categoriesRes.json();

        setSkillsOptions(skillsData);
        setSpecialtiesOptions(specialtiesData);
        setIndustryOptions(industriesData);

        // Desplegar subcategorías con nombre compuesto "Categoría > Subcategoría"
        const types: OptionItem[] = categoriesData.flatMap((cat) => {
          if (cat.subcategories && Array.isArray(cat.subcategories)) {
            return cat.subcategories.map((sub) => ({
              id: sub.id,
              name: `${cat.name} > ${sub.name}`,
            }));
          }
          return [{ id: cat.id, name: cat.name }];
        });
        setCategoriesOptions(types);

      } catch (err) {
        console.error("Error loading project options:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchOptions();
  }, []);

  return {
    skillsOptions,
    specialtiesOptions,
    industryOptions,
    categoriesOptions,
    loading,
    error,
  };
}
