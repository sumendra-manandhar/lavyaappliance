
import { useState, useEffect } from 'react';
import { Product, Category } from '../types';
import { ApiService } from '../services/api';
import { PRODUCTS, CATEGORIES } from '../constants'; // Fallback initial data

export const useAppStore = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // NOTE: In a real environment, uncomment these lines:
        // const [fetchedProducts, fetchedCategories] = await Promise.all([
        //   ApiService.getProducts(),
        //   ApiService.getCategories()
        // ]);
        // setProducts(fetchedProducts);
        // setCategories(fetchedCategories);

        // For demo purposes (since the URL is random), we load local data but simulating an API structure
        // If the API fails, we fallback to constants so the app isn't empty.
        setProducts(PRODUCTS);
        setCategories(CATEGORIES);
        
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to connect to database. Loaded offline data.");
        // Fallback
        setProducts(PRODUCTS);
        setCategories(CATEGORIES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Product Actions ---
  const addProduct = async (product: Product) => {
    // Optimistic Update
    setProducts((prev) => [...prev, product]);
    try {
      await ApiService.createProduct(product);
    } catch (e) {
      console.error("API Error (Create Product):", e);
      // Revert logic would go here
    }
  };

  const updateProduct = async (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    try {
      await ApiService.updateProduct(product);
    } catch (e) {
      console.error("API Error (Update Product):", e);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await ApiService.deleteProduct(id);
    } catch (e) {
      console.error("API Error (Delete Product):", e);
    }
  };

  const trackProductClick = async (id: string) => {
    // Optimistic Update
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, clicks: (p.clicks || 0) + 1 } : p
    ));
    // Fire and forget API call
    ApiService.trackProductView(id);
  };

  // --- Category Actions ---
  const addCategory = async (category: Category) => {
    setCategories((prev) => [...prev, category]);
    try {
      await ApiService.createCategory(category);
    } catch (e) {
      console.error("API Error (Create Category):", e);
    }
  };

  const updateCategory = async (category: Category) => {
    setCategories((prev) => prev.map((c) => (c.id === category.id ? category : c)));
    try {
      await ApiService.updateCategory(category);
    } catch (e) {
      console.error("API Error (Update Category):", e);
    }
  };

  const deleteCategory = async (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    try {
      await ApiService.deleteCategory(id);
    } catch (e) {
      console.error("API Error (Delete Category):", e);
    }
  };

  const trackCategoryClick = async (id: string) => {
    // Optimistic Update
    setCategories(prev => prev.map(c => 
      c.id === id ? { ...c, clicks: (c.clicks || 0) + 1 } : c
    ));
    ApiService.trackCategoryView(id);
  };

  return {
    products,
    categories,
    isLoading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    trackProductClick,
    addCategory,
    updateCategory,
    deleteCategory,
    trackCategoryClick
  };
};
