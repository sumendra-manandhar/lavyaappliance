
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, Category, ViewState } from '../types';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';

interface ProductListingPageProps {
  products: Product[];
  categories: Category[];
  view: 'category' | 'search';
  selectedCategoryId: string | null;
  searchQuery: string;
  onNavigate: (view: ViewState, id?: string) => void;
  onCompare: (product: Product) => void;
  compareList: Product[];
}

const ProductListingPage: React.FC<ProductListingPageProps> = ({
  products,
  categories,
  view,
  selectedCategoryId,
  searchQuery: globalSearchQuery,
  onNavigate,
  onCompare,
  compareList
}) => {
  // Local Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  
  // Sorting state
  const [sortBy, setSortBy] = useState<'featured' | 'priceLow' | 'priceHigh'>('featured');

  // Reset filters when main view context changes
  useEffect(() => {
    setSelectedBrands([]);
    setMaxPrice(500000);
    setLocalSearchQuery('');
    setSelectedColors([]);
  }, [selectedCategoryId, view, globalSearchQuery]);

  const currentCategory = categories.find(c => c.id === selectedCategoryId);

  // --- Filtering Logic ---
  const filteredProducts = useMemo(() => {
    let baseList = products;

    // 1. Initial Source Filtering
    if (view === 'category') {
        if (selectedCategoryId && selectedCategoryId !== 'all') {
            baseList = baseList.filter(p => p.categoryId === selectedCategoryId);
        }
    } else if (view === 'search') {
        // Global search overrides specific category
        baseList = baseList.filter(p => 
            p.name.toLowerCase().includes(globalSearchQuery.toLowerCase()) || 
            p.brand.toLowerCase().includes(globalSearchQuery.toLowerCase())
        );
    }

    // 2. Apply Local Filters
    let result = baseList.filter(p => {
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchesPrice = p.variants[0].price <= maxPrice;
      const matchesSearch = localSearchQuery === '' || p.name.toLowerCase().includes(localSearchQuery.toLowerCase());
      
      const productColors = p.variants.map(v => v.color);
      const matchesColor = selectedColors.length === 0 || selectedColors.some(c => productColors.includes(c));

      return matchesBrand && matchesPrice && matchesSearch && matchesColor;
    });

    // 3. Apply Sorting
    if (sortBy === 'priceLow') {
        result.sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === 'priceHigh') {
        result.sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else {
        // Featured
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [
    products, 
    view, 
    selectedCategoryId, 
    globalSearchQuery, 
    selectedBrands, 
    maxPrice, 
    localSearchQuery, 
    selectedColors,
    sortBy
  ]);

  // Derived Data for Sidebar
  const availableBrands = useMemo(() => {
    let source = products;
    if (view === 'category' && selectedCategoryId && selectedCategoryId !== 'all') {
        source = products.filter(p => p.categoryId === selectedCategoryId);
    }
    return Array.from(new Set(source.map(p => p.brand)));
  }, [selectedCategoryId, view, products]);

  const availableColors = useMemo(() => {
    let source = products;
    if (view === 'category' && selectedCategoryId && selectedCategoryId !== 'all') {
        source = products.filter(p => p.categoryId === selectedCategoryId);
    }
    const colors = new Map<string, string>();
    source.forEach(p => p.variants.forEach(v => {
        if (v.color && v.finishName) colors.set(v.color, v.finishName);
    }));
    return Array.from(colors.entries()).map(([hex, name]) => ({ hex, name }));
  }, [selectedCategoryId, view, products]);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-12 bg-[#fafafa] dark:bg-slate-950 min-h-screen transition-colors duration-300"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
            {view === 'category' ? (
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-8">
                    <div>
                        <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-2 block">
                            {currentCategory ? "Collection" : "Showroom"}
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter">
                            {currentCategory ? currentCategory.name : "All Products"}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl text-lg font-light">
                            {currentCategory 
                                ? `Explore our premium range of ${currentCategory.name.toLowerCase()} designed for modern living.`
                                : "The complete catalog of our premium electronic appliances."
                            }
                        </p>
                    </div>
                </div>
            ) : (
                <div className="border-b border-slate-200 dark:border-slate-800 pb-8">
                     <span className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-[0.2em] text-xs mb-2 block">Search Results</span>
                     <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">"{globalSearchQuery}"</h1>
                     <p className="text-slate-500 dark:text-slate-400 mt-2">{filteredProducts.length} matches found</p>
                </div>
            )}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <FilterSidebar 
            availableBrands={availableBrands}
            selectedBrands={selectedBrands}
            onToggleBrand={(b) => setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b])}
            priceRange={[0, maxPrice]}
            onPriceChange={(_, max) => setMaxPrice(max)}
            searchQuery={localSearchQuery}
            onSearchChange={setLocalSearchQuery}
            selectedColors={selectedColors}
            onToggleColor={(c) => setSelectedColors(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])}
            availableColors={availableColors}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={(id) => onNavigate('category', id)}
          />

          {/* Grid Area */}
          <div className="flex-grow">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {filteredProducts.length} items</p>
              <div className="flex items-center space-x-2">
                 <span className="text-xs font-bold text-slate-400 uppercase">Sort By</span>
                 <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-sm font-bold text-slate-900 dark:text-white border-none focus:ring-0 cursor-pointer pr-8 py-0"
                 >
                     <option value="featured" className="text-black">Featured</option>
                     <option value="priceLow" className="text-black">Price: Low to High</option>
                     <option value="priceHigh" className="text-black">Price: High to Low</option>
                 </select>
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                  {filteredProducts.map((product, i) => (
                    <ProductCard 
                        key={product.id} 
                        product={product} 
                        onNavigate={onNavigate} 
                        onCompare={() => onCompare(product)}
                        isComparing={compareList.some(cp => cp.id === product.id)}
                        index={i}
                    />
                  ))}
              </AnimatePresence>
            </motion.div>
            
            {filteredProducts.length === 0 && (
              <div className="py-32 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800">
                <div className="text-6xl mb-4 grayscale opacity-30">🔍</div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">No matches found</h3>
                <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or checking another category.</p>
                <button onClick={() => {
                    setSelectedBrands([]);
                    setMaxPrice(500000);
                    setLocalSearchQuery('');
                    setSelectedColors([]);
                }} className="mt-6 text-blue-600 font-bold hover:underline">Reset Filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProductListingPage;
