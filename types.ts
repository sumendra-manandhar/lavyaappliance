
export interface Spec {
  label: string;
  value: string;
}

export interface Variant {
  id: string;
  variantName: string;
  price: number;
  sku: string;
  images: string[];
  specs: Spec[];
  stock: number;
  color: string; // Hex code for the swatch
  finishName: string; // Display name (e.g., "Matte Black")
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  clicks?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  categoryName: string;
  variants: Variant[];
  featured?: boolean;
  brand: string;
  clicks?: number;
}

export interface PageContent {
  title: string;
  content: string; // Can be HTML string or markdown-like text
  subtitle?: string;
}

export type ViewState = 'home' | 'category' | 'product' | 'compare' | 'search' | 'page' | 'admin';
