// src/utils/maps.ts
import skillsData from "@/data/skills.json";
import specialtiesData from "@/data/specialties.json";
import industriesData from "@/data/industries.json";
import categoriesData from "@/data/categories.json";
import subcategoriesData from "@/data/subcategories.json";

import type {
  SkillItem,
  SpecialtyItem,
  IndustryItem,
  CategoryItem,
  SubcategoryItem,
} from "@/types";

// Construir mapas ID -> name
export const skillsMap: Record<number, string> = {};
(skillsData as SkillItem[]).forEach((item) => {
  skillsMap[item.id] = item.name;
});

export const specialtiesMap: Record<number, string> = {};
(specialtiesData as SpecialtyItem[]).forEach((item) => {
  specialtiesMap[item.id] = item.name;
});

export const industriesMap: Record<number, string> = {};
(industriesData as IndustryItem[]).forEach((item) => {
  industriesMap[item.id] = item.name;
});

export const categoriesMap: Record<number, string> = {};
(categoriesData as CategoryItem[]).forEach((item) => {
  categoriesMap[item.id] = item.name;
});

// Para subcategorías, podrías necesitar también agrupar por categoryId, pero para lookup simple:
export const subcategoriesMap: Record<number, string> = {};
(subcategoriesData as SubcategoryItem[]).forEach((item) => {
  subcategoriesMap[item.id] = item.name;
});

// (Opcional) Mapa de categoryId -> array de subcategorías
export const subcategoriesByCategory: Record<number, SubcategoryItem[]> = {};
(subcategoriesData as SubcategoryItem[]).forEach((item) => {
  if (!subcategoriesByCategory[item.categoryId]) {
    subcategoriesByCategory[item.categoryId] = [];
  }
  subcategoriesByCategory[item.categoryId].push(item);
});
