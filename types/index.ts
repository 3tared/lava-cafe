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

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  ingredients?: string[];
  allergens?: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  isPopular?: boolean;
  isVegan?: boolean;
  isNew?: boolean;
  isGlutenFree?: boolean;
  availableSizes?: string[];
  reviews?: {
    rating: number;
    comment: string;
    author: string;
  }[];
}
