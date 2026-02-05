
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ViewState, Product } from './types';
import { STATIC_PAGES } from './constants';
import { useAppStore } from './hooks/useAppStore'; // Import Custom Hook
import Header from './components/Header';
import Footer from './components/Footer';
import ComparisonOverlay from './components/ComparisonOverlay';

// Pages
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AdminPage from './pages/AdminPage';
import ComparisonPage from './pages/ComparisonPage';
import GenericPage from './pages/GenericPage';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  
  // -- Theme State --
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
       return localStorage.getItem('es_theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('es_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('es_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // -- Data State (via API Hook) --
  const { 
    products, 
    categories, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    trackProductClick,
    addCategory,
    updateCategory,
    deleteCategory,
    trackCategoryClick,
    isLoading 
  } = useAppStore();

  // -- Search & Compare State --
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const handleNavigate = (newView: ViewState, id?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // --- Analytics Tracking Interception ---
    if (newView === 'product' && id) {
        trackProductClick(id);
    }
    if (newView === 'category' && id && id !== 'all') {
        trackCategoryClick(id);
    }
    // ----------------------------------------

    if (newView === 'product') {
      setSelectedProductId(id || null);
    } else if (newView === 'category') {
      setSelectedCategoryId(id || null);
    } else if (newView === 'page') {
      setSelectedPageId(id || null);
    } else if (newView === 'home') {
       setGlobalSearchQuery('');
    }
    setView(newView);
  };

  const handleGlobalSearch = (query: string) => {
      setGlobalSearchQuery(query);
      setView('search');
      window.scrollTo(0, 0);
  };

  const toggleCompare = (p: Product) => {
    setCompareList(prev => {
      const isAlreadyAdded = prev.find(item => item.id === p.id);
      if (isAlreadyAdded) return prev.filter(item => item.id !== p.id);

      if (prev.length > 0 && prev[0].categoryId !== p.categoryId) {
        alert(`Comparison Restricted: You can only compare items from the same category.\n\nCurrent Selection: ${prev[0].categoryName}\nNew Item: ${p.categoryName}`);
        return prev;
      }

      if (prev.length >= 3) {
        alert("Maximum 3 products can be compared at once.");
        return prev;
      }

      return [...prev, p];
    });
  };

  const currentProduct = products.find(p => p.id === selectedProductId);
  const currentPageContent = selectedPageId ? STATIC_PAGES[selectedPageId] : null;

  if (isLoading && products.length === 0) {
    return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white">Loading ElectroStream...</div>;
  }

  const renderView = () => {
    switch (view) {
      case 'home':
        return (
          <HomePage 
            products={products} 
            categories={categories} 
            onNavigate={handleNavigate} 
            onCompare={toggleCompare}
            compareList={compareList}
          />
        );
      case 'category':
      case 'search':
        return (
          <ProductListingPage 
             products={products}
             categories={categories}
             view={view}
             selectedCategoryId={selectedCategoryId}
             searchQuery={globalSearchQuery}
             onNavigate={handleNavigate}
             onCompare={toggleCompare}
             compareList={compareList}
          />
        );
      case 'product':
        return currentProduct ? (
          <ProductDetailPage 
              product={currentProduct} 
              allProducts={products}
              onNavigate={handleNavigate} 
              onCompare={toggleCompare}
              isComparing={compareList.some(cp => cp.id === currentProduct.id)}
              compareList={compareList}
          />
        ) : null;
      case 'compare':
        return (
          <ComparisonPage 
            products={compareList} 
            onNavigate={handleNavigate} 
            onClose={() => setView('home')} 
          />
        );
      case 'page':
        return currentPageContent ? (
          <GenericPage content={currentPageContent} />
        ) : null;
      case 'admin':
        return (
           <AdminPage 
            products={products}
            categories={categories}
            onAddProduct={addProduct}
            onUpdateProduct={updateProduct}
            onDeleteProduct={deleteProduct}
            onAddCategory={addCategory}
            onUpdateCategory={updateCategory}
            onDeleteCategory={deleteCategory}
            onNavigate={handleNavigate}
          />
        );
      default:
        return null;
    }
  };

  if (view === 'admin') {
    return renderView();
  }

  return (
    <div className="min-h-screen flex flex-col font-['Inter'] bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Header 
        onNavigate={handleNavigate} 
        onGlobalSearch={handleGlobalSearch}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
           {renderView()}
        </AnimatePresence>
      </main>

      <ComparisonOverlay 
        compareList={compareList} 
        onRemove={(id) => setCompareList(prev => prev.filter(x => x.id !== id))} 
        onNavigate={handleNavigate}
      />
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;
