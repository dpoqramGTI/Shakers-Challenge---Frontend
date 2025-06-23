// src/types.ts

// Tipos para mapeos estáticos:
export interface SkillItem { id: number; name: string; }
export interface SpecialtyItem { id: number; name: string; }
export interface IndustryItem { id: number; name: string; }
export interface CategoryItem { id: number; name: string; }
export interface SubcategoryItem { id: number; name: string; categoryId: number; }

// Tipo para RawProject según la empresa:
export interface RawOrganization {
  id: number;
  name: string;
  logo: string;
  industry: number; // ID numérico
}

export interface RawProjectLeader {
  id: number;
  name: string;
  lastName: string;
}

export interface RawBudget {
  hourFrom: number | null;
  hourTo: number | null;
  total: number | null;
}

export interface RawPosition {
  id: number;
  title: string;
  skillIds: number[];
  skills: number[];
  specialties: number[];
  referralBonus: number;
}

export interface RawFAQ {
  question: string;
  answer: string;
}

export interface RawProject {
  id: number;
  title: string;
  organization: RawOrganization;
  projectLeader: RawProjectLeader;
  category: number;
  subcategory: number;
  startDate: string;
  budget: RawBudget;
  totalHours: number;
  description: string;
  goals: string[];
  faqs: RawFAQ[];
  status: string;
  creationDate: string;
  positions: RawPosition[];
  totalApplicationsAmount: number;
  publishedAt: string;
}

// Tipo enriquecido para frontend:
export interface Project {
  id: number;
  title: string;
  organization: {
    id: number;
    name: string;
    logo: string;
    industry: string;
  };
  projectLeader: {
    id: number;
    name: string;
    lastName: string;
  };
  category: string;
  subcategory: string;
  startDate: string;
  budget: {
    hourFrom: number | null;
    hourTo: number | null;
    total: number | null;
  };
  totalHours: number;
  description: string;
  goals: string[];
  faqs: { question: string; answer: string }[];
  status: string;
  creationDate: string;
  positions: {
    id: number;
    title: string;
    skillIds: number[];
    skills: string[];
    specialties: string[];
    referralBonus: number;
  }[];
  totalApplicationsAmount: number;
  publishedAt: string;
}

export interface Position {
  id: number;
  title: string;
  skills: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Organization {
  name: string;
  industry: string;
  logo: string; // URL o path al logo (por ejemplo, para el componente <Image />)
}

export interface Person {
  name: string;
  lastName: string;
}

// Tipo para filtros
export interface FilterValues {
  specialties: string[];
  skills: string[];
  projectTypes: string[];
  industries: string[];
  sortOrder: "newest" | "oldest";
}

// Exportar para los componentes
export type { FilterValues as ProjectFilterValues };
