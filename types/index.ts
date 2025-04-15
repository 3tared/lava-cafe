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
