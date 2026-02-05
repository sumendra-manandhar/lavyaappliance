
import React from 'react';
import { Category, ViewState } from '../types';

interface CategoryGridProps {
  categories: Category[];
  onNavigate: (view: ViewState, id?: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onNavigate }) => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Browse by Category</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-lg text-lg">Find the perfect appliance tailored to your needs.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              onClick={() => onNavigate('category', cat.id)}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-full bg-slate-50 dark:bg-slate-900 mb-6 transition-all duration-500 border border-slate-100 dark:border-slate-800 group-hover:border-blue-200 dark:group-hover:border-blue-800 group-hover:shadow-xl">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/5 dark:bg-black/40 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-center text-sm uppercase tracking-wide group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
