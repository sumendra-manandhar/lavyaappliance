
import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onNavigate: (view: 'product', id: string) => void;
  onCompare: () => void;
  isComparing: boolean;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, onCompare, isComparing, index }) => {
  const mainVariant = product.variants[0];

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
    >
      {/* Badge */}
      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 pointer-events-none">
        {product.featured && (
          <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-widest rounded-full w-fit shadow-md">
            Featured
          </span>
        )}
        {mainVariant.stock < 5 && (
           <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full w-fit shadow-md">
             Low Stock
           </span>
        )}
      </div>

      {/* Compare Plus Icon (Top Right) - Always visible on hover or if selected */}
      <div className={`absolute top-4 right-4 z-30 transition-all duration-300 ${isComparing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); onCompare(); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-sm border ${
                isComparing 
                ? 'bg-blue-600 text-white border-blue-600 scale-110' 
                : 'bg-white/90 dark:bg-slate-800/90 text-slate-400 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600'
            }`}
            title={isComparing ? "Remove from comparison" : "Add to compare"}
          >
             {isComparing ? (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
             ) : (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
             )}
          </button>
      </div>

      {/* Image Area */}
      <div 
        onClick={() => onNavigate('product', product.id)}
        className="relative aspect-[4/4] bg-[#f8f8f8] dark:bg-slate-800 cursor-pointer overflow-hidden group-hover:bg-[#f4f4f4] dark:group-hover:bg-slate-700 transition-colors duration-500"
      >
        <div className="absolute inset-0 flex items-center justify-center p-8">
           <img 
             src={mainVariant.images[0]} 
             alt={product.name} 
             className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 ease-in-out group-hover:scale-110"
           />
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow relative bg-white dark:bg-slate-900">
        <div className="flex items-center space-x-2 mb-3">
           <div className="w-3 h-3 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm" style={{ backgroundColor: mainVariant.color }}></div>
           <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{mainVariant.finishName}</span>
        </div>
        
        <h3 
          onClick={() => onNavigate('product', product.id)}
          className="text-lg font-bold text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2 line-clamp-2"
        >
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-end justify-between border-t border-slate-50 dark:border-slate-800">
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Price</p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">NPR {mainVariant.price.toLocaleString()}</p>
           </div>
           <button 
             onClick={() => onNavigate('product', product.id)}
             className="text-[10px] font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full uppercase tracking-widest hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors"
           >
              View
           </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
