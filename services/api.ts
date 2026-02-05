
import { Product, Category } from '../types';

// Replace with your actual backend URL
const API_BASE_URL = 'https://api.lavyaappliance.dev/v1';

export const ApiService = {
  // --- Products ---
  getProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  createProduct: async (product: Product): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  updateProduct: async (product: Product): Promise<Product> => {
    const response = await fetch(`${API_BASE_URL}/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  deleteProduct: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete product');
  },

  trackProductView: async (id: string): Promise<void> => {
    // Fire and forget - tracking should not block UI
    await fetch(`${API_BASE_URL}/analytics/product/${id}`, { method: 'POST' }).catch(console.error);
  },

  // --- Categories ---
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  },

  createCategory: async (category: Category): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
  },

  updateCategory: async (category: Category): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${category.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to update category');
    return response.json();
  },

  deleteCategory: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete category');
  },

  trackCategoryView: async (id: string): Promise<void> => {
    await fetch(`${API_BASE_URL}/analytics/category/${id}`, { method: 'POST' }).catch(console.error);
  }
};
