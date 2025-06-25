import type { RawProject, Project, RawPosition } from "@/types";

/**
 * Type guard para determinar si un elemento de pos.skills es un objeto con id.
 */
function isSkillObject(
  el: number | { id: number; name: string },
): el is { id: number; name: string } {
  return (
    typeof el === "object" &&
    el !== null &&
    "id" in el &&
    typeof (el as { id: unknown }).id === "number"
  );
}

/**
 * Type guard para determinar si un elemento de pos.specialties es un objeto con id.
 */
function isSpecialtyObject(
  el: number | { id: number; name: string },
): el is { id: number; name: string } {
  return (
    typeof el === "object" &&
    el !== null &&
    "id" in el &&
    typeof (el as { id: unknown }).id === "number"
  );
}

export function transformRawProject(raw: RawProject): Project {
  // Industria: si es objeto, toma el nombre, si es string (id), lo dejamos como ID
  const orgIndustryName =
    typeof raw.organization.industry === "object"
      ? raw.organization.industry.name
      : `Industry ID ${raw.organization.industry}`;

  // Categoría
  const categoryName =
    typeof raw.category === "object"
      ? raw.category.name
      : `Category ID ${raw.category}`;

  // Subcategoría
  const subcategoryName =
    raw.subcategory && typeof raw.subcategory === "object"
      ? raw.subcategory.name
      : raw.subcategory
        ? `Subcategory ID ${raw.subcategory}`
        : "";

  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    organization: {
      id: raw.organization.id,
      name: raw.organization.name,
      logo: raw.organization.logo,
      industry: orgIndustryName,
    },
    projectLeader: {
      id: raw.projectLeader.id,
      name: raw.projectLeader.name,
      lastName: raw.projectLeader.lastName,
    },
    category: categoryName,
    subcategory: subcategoryName,
    startDate: raw.startDate,
    creationDate: raw.creationDate,
    publishedAt: raw.publishedAt,
    status: raw.status,
    totalHours: raw.totalHours,
    budget: {
      total: raw.budgetTotal ?? null,
      hourFrom: raw.budgetHourFrom ?? null,
      hourTo: raw.budgetHourTo ?? null,
    },
    goals: Array.isArray(raw.goals) ? raw.goals : [],
    faqs: Array.isArray(raw.faqs)
      ? raw.faqs.map((f) => ({ question: f.question, answer: f.answer }))
      : [],
    positions: Array.isArray(raw.positions)
      ? raw.positions.map((pos: RawPosition) => {
        const skills = pos.skills.map((s) => {
          if (isSkillObject(s)) return s.name;
          return `Skill ID ${s}`;
        });
        const specialties = pos.specialties.map((s) => {
          if (isSpecialtyObject(s)) return s.name;
          return `Specialty ID ${s}`;
        });
        return {
          id: pos.id,
          title: pos.title,
          skills,
          skillIds: pos.skills.map((s) => (isSkillObject(s) ? s.id : s)),
          specialties,
          referralBonus: pos.referralBonus ?? 0,
        };
      })
      : [],
    totalApplicationsAmount: raw.totalApplicationsAmount,
  };
}
