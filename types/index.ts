export interface ICafePackage {
  name: string;
  originalPrice: string;
  price: string;
  per: string;
  description: string;
  items: string[];
  emoji: string;
  popular: boolean;
  tag: string;
  discount: string;
}
export type GalleryImage = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: "indoor" | "outdoor" | "Food" | "events" | "Staff";
};

export interface NutritionalInfo {
  id: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  menuItemId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category: Category;
  ingredients: string[];
  nutritionalInfo?: NutritionalInfo;
  isVegan: boolean;
  isGlutenFree: boolean;
  isPopular: boolean;
  isNew: boolean;
  averageRating?: number;
  reviewCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Team member types
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl?: string; // Optional image
  funFact?: string; // Optional fun fact
}

export interface TeamSection {
  id: string;
  title: string;
  description: string;
  members: TeamMember[];
}

export interface JobPosition {
  id: string;
  title: string;
  description: string;
  requirements: string[];
}

// types.ts
export interface UserType {
  id: string;
  firstName: string;
  role: string;
}

export interface KindeUserType {
  id: string;
  given_name: string;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  email: string | null;
  phone: string | null;
  bio: string | null;
  imageUrl: string | null;
  funFact: string | null;
  status: "Active" | "On Leave" | "Inactive";
  startDate: Date;
  departmentId: string | null;
  department?: Department;
  createdAt: Date;
  updatedAt: Date;
}

// Types for the Department model
export interface Department {
  id: string;
  title: string;
  description: string | null;
  employees?: Employee[];
  createdAt: Date;
  updatedAt: Date;
}

// Types for creating/updating employees
export interface EmployeeFormData {
  name: string;
  position: string;
  email: string;
  phone: string;
  bio: string;
  imageUrl?: string;
  funFact?: string;
  status: "Active" | "On Leave" | "Inactive";
  startDate: string;
  departmentId?: string;
}

// Type for API response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface MenuApiResponse {
  items: MenuItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface IEvent {
  id: string;
  title: string;
  date: Date;
  image?: string;
  type: string;
  location: string;
  time: string;
  packageId?: string;
  package?: IPackage;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPackage {
  id: string;
  name: string;
  originalPrice: string;
  price: string;
  per: string;
  description: string;
  items: string[];
  emoji: string;
  popular: boolean;
  tag: string;
  discount: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePackageData {
  name: string;
  originalPrice: string;
  price: string;
  per: string;
  description: string;
  items: string[];
  emoji: string;
  popular: boolean;
  tag: string;
  discount: string;
}

export interface UpdatePackageData extends CreatePackageData {
  id: string;
}

export interface CreateEventData {
  title: string;
  date: string;
  image?: string;
  type: string;
  location: string;
  time: string;
  packageId?: string;
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string;
}

export interface Announcement {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
  badge?: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobPosition {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyValue {
  id: string;
  value: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplication {
  id: string;
  name: string;
  age: string;
  address: string;
  phone: string;
  email: string;
  experience?: string | null;
  status: "PENDING" | "REVIEWED" | "INTERVIEWED" | "ACCEPTED" | "REJECTED";
  positionId: string;
  position: JobPosition;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobApplicationForm {
  name: string;
  age: string;
  address: string;
  phone: string;
  email: string;
  experience: string;
  positionId: string;
}
export interface PrismaUser {
  id: string;
  kindeId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  marketing: boolean;
}
