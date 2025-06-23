// src/utils/transform.ts
import type { RawProject, Project } from "@/types";
import {
  skillsMap,
  specialtiesMap,
  industriesMap,
  categoriesMap,
} from "@/utils/maps";

export function transformRawProject(raw: RawProject): Project {
  const orgIndustryName =
    industriesMap[raw.organization.industry] ??
    `ID ${raw.organization.industry}`;
  const categoryName = categoriesMap[raw.category] ?? `ID ${raw.category}`;
  const subcategoryName =
    categoriesMap[raw.subcategory] ?? `ID ${raw.subcategory}`;

  return {
    id: raw.id,
    title: raw.title,
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
    budget: {
      hourFrom: raw.budget.hourFrom,
      hourTo: raw.budget.hourTo,
      total: raw.budget.total,
    },
    totalHours: raw.totalHours,
    description: raw.description,
    goals: raw.goals,
    faqs: raw.faqs.map((f) => ({ question: f.question, answer: f.answer })),
    status: raw.status,
    creationDate: raw.creationDate,
    // Aquí incluimos skillIds además de skills (nombres)
    positions: raw.positions.map((pos) => ({
      id: pos.id,
      title: pos.title,
      skillIds: pos.skills, // array de IDs numéricos
      skills: pos.skills.map((id) => skillsMap[id] ?? `ID ${id}`),
      specialties: pos.specialties.map(
        (id) => specialtiesMap[id] ?? `ID ${id}`,
      ),
      referralBonus: pos.referralBonus,
    })),
    totalApplicationsAmount: raw.totalApplicationsAmount,
    publishedAt: raw.publishedAt,
  };
}
