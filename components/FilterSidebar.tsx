
import React from 'react';
import { motion } from 'framer-motion';
import { Category } from '../types';

interface FilterSidebarProps {
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  priceRange: [number, number];
  onPriceChange: (min: number, max: number) => void;
  availableBrands: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedColors: string[];
  onToggleColor: (color: string) => void;
  availableColors: { hex: string, name: string }[];
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  selectedBrands, 
  onToggleBrand, 
  priceRange, 
  onPriceChange,
  availableBrands,
  searchQuery,
  onSearchChange,
  selectedColors,
  onToggleColor,
  availableColors,
  categories,
  selectedCategoryId,
  onSelectCategory
}) => {
  return (
    <aside className="w-72 flex-shrink-0 hidden lg:block space-y-10 pr-8 overflow-y-auto max-h-[calc(100vh-100px)] sticky top-24 no-scrollbar">
      
      {/* Category Search */}
      <div className="relative">
         <input 
            type="text" 
            placeholder="Search keywords..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all dark:text-white"
         />
         <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </div>

      {/* Categories Section */}
      <div>
        <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Categories</h3>
        <div className="space-y-3">
          <div 
            onClick={() => onSelectCategory('all')}
            className={`flex items-center cursor-pointer p-2 -ml-2 rounded-lg transition-colors ${!selectedCategoryId || selectedCategoryId === 'all' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            <div className={`w-2 h-2 rounded-full mr-3 ${!selectedCategoryId || selectedCategoryId === 'all' ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
            <span className="text-sm font-bold">All Products</span>
          </div>
          {categories.map(cat => (
            <div 
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center cursor-pointer p-2 -ml-2 rounded-lg transition-colors ${selectedCategoryId === cat.id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
            >
              <div className={`w-2 h-2 rounded-full mr-3 ${selectedCategoryId === cat.id ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
              <span className="text-sm font-bold">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Price Range</h3>
        <div className="space-y-6">
          <input 
            type="range" 
            min="0" 
            max="500000" 
            step="5000"
            value={priceRange[1]}
            onChange={(e) => onPriceChange(0, parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-900 dark:accent-white"
          />
          <div className="flex justify-between items-center">
             <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-500 dark:text-slate-400">Min: 0</span>
             <span className="px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold">Max: {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Color Filter */}
      {availableColors.length > 0 && (
        <div>
           <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Finish & Color</h3>
           <div className="flex flex-wrap gap-3">
              {availableColors.map((c) => (
                <motion.button 
                  key={c.hex}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onToggleColor(c.hex)}
                  className={`w-8 h-8 rounded-full border-2 shadow-sm flex items-center justify-center transition-all ${selectedColors.includes(c.hex) ? 'border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900' : 'border-slate-200 dark:border-slate-700'}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                   {selectedColors.includes(c.hex) && (
                     <svg className={`w-3 h-3 ${['#FFFFFF', '#ffffff', 'white'].includes(c.hex) ? 'text-black' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                   )}
                </motion.button>
              ))}
           </div>
        </div>
      )}

      <div>
        <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Brands</h3>
        <div className="space-y-3">
          {availableBrands.map(brand => (
            <label key={brand} className="flex items-center group cursor-pointer">
              <div className={`w-5 h-5 rounded-md border-2 mr-3 flex items-center justify-center transition-all ${selectedBrands.includes(brand) ? 'bg-slate-900 dark:bg-white border-slate-900 dark:border-white shadow-md' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 group-hover:border-slate-400'}`}>
                {selectedBrands.includes(brand) && <svg className="w-3 h-3 text-white dark:text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>}
              </div>
              <input 
                type="checkbox" 
                className="hidden" 
                checked={selectedBrands.includes(brand)}
                onChange={() => onToggleBrand(brand)}
              />
              <span className={`text-sm font-bold transition-colors ${selectedBrands.includes(brand) ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-3xl border border-blue-100 dark:border-slate-700">
        <h4 className="text-xs font-black text-blue-900 dark:text-blue-300 uppercase tracking-tighter mb-2">Expert Consultation</h4>
        <p className="text-[10px] text-blue-600/80 dark:text-slate-400 leading-relaxed mb-4">Not sure which specs match your room size? Let our engineers decide.</p>
        <button className="text-[10px] font-black bg-white dark:bg-slate-700 text-blue-600 dark:text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all uppercase tracking-widest w-full">Chat Now</button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
