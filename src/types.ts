// src/types.ts

// Tipos para mapeos estáticos:
export interface SkillItem { id: number; name: string; }
export interface SpecialtyItem { id: number; name: string; }
export interface IndustryItem { id: number; name: string; }
export interface CategoryItem { id: number; name: string; }
export interface SubcategoryItem { id: number; name: string; categoryId: number; }

// Tipo para RawProject según la respuesta de la API:
export interface RawOrganization {
  id: number;
  name: string;
  logo: string;
  industry: {
    id: number;
    name: string;
  };
  industryId: number;
}

export interface RawProjectLeader {
  id: number;
  name: string;
  lastName: string;
}

export interface RawPosition {
  id: number;
  title: string;
  projectId: number;
  skills: {
    id: number;
    name: string;
  }[];
  specialties: {
    id: number;
    name: string;
  }[];
  referralBonus: number | null;
}

export interface RawFAQ {
  question: string;
  answer: string;
}

export interface RawProject {
  id: number;
  title: string;
  description: string;
  organization: RawOrganization;
  organizationId: number;
  projectLeader: RawProjectLeader;
  projectLeaderId: number;
  category: {
    id: number;
    name: string;
  };
  categoryId: number;
  subcategory: {
    id: number;
    name: string;
  } | null;
  subcategoryId: number | null;
  totalHours: number;
  budgetHourFrom: number | null;
  budgetHourTo: number | null;
  budgetTotal: number | null;
  startDate: string;
  creationDate: string;
  publishedAt: string;
  status: string;
  goals: string[];
  faqs: RawFAQ[];
  positions: RawPosition[];
  totalApplicationsAmount: number;
}

// Tipo enriquecido para frontend:
export interface Project {
  id: number;
  title: string;
  description: string;
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
  creationDate: string;
  publishedAt: string;
  status: string;
  totalHours: number;
  budget: {
    total: number | null;
    hourFrom: number | null;
    hourTo: number | null;
  };
  goals: string[];
  faqs: { question: string; answer: string }[];
  positions: {
    id: number;
    title: string;
    skillIds: number[];
    skills: string[];
    specialties: string[];
    referralBonus: number;
  }[];
  totalApplicationsAmount: number;
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
  logo: string; // URL o path al logo
}

export interface Person {
  name: string;
  lastName: string;
}

// Tipo para filtros
export type FilterValues = {
  specialties: number[];
  skills: number[];
  categories: number[];
  industries: number[];
  sortOrder: "newest" | "oldest";
};

export type { FilterValues as ProjectFilterValues };

// ------------------------------------------------------
// Tipos para paginación y consulta de proyectos
// ------------------------------------------------------
/**
 * Parámetros de consulta (query params) para la lista de proyectos.
 * Se envían como ?page=0&limit=20&category=...&skills=js&skills=react etc.
 */
export interface ProjectQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  subcategory?: string;
  industries?: number[];
  minBudget?: number;
  maxBudget?: number;
  skills?: number[];
  specialties?: number[];
  categories?: number[];
  sort?: string;
}

/**
 * Respuesta de la API para lista de proyectos paginada.
 */
export interface ProjectListResponse {
  items: RawProject[]; // raw, luego transformar en frontend
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

/**
 * Respuesta de la API para detalle de un proyecto.
 */
export type ProjectDetailResponse = RawProject;

export type OptionItem = {
  id: number;
  name: string;
};

export interface FilterBarProps {
  specialtiesOptions: OptionItem[];
  skillsOptions: OptionItem[];
  categoriesOptions: OptionItem[];
  industryOptions: OptionItem[];
  onApply: (filters: FilterValues) => void;
  onClear?: () => void;
  initialValues?: Partial<FilterValues>;
  applyButtonText?: string;
  clearButtonText?: string;
}
