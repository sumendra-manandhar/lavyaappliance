
import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import CategoryGrid from './CategoryGrid';
import ProductCard from './ProductCard';
import Testimonials from './Testimonials';
import ShowroomMap from './ShowroomMap';
import { Product, Category, ViewState } from '../types';

interface HomePageProps {
  products: Product[];
  categories: Category[];
  onNavigate: (view: ViewState, id?: string) => void;
  onCompare: (product: Product) => void;
  compareList: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ 
  products, 
  categories, 
  onNavigate, 
  onCompare, 
  compareList 
}) => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <Hero onNavigate={onNavigate} />
      
      <CategoryGrid categories={categories} onNavigate={onNavigate} />
      
      {/* Featured Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-3 block">Flagship Series</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Innovation Highlights</h2>
            </div>
            <button 
              onClick={() => onNavigate('category', 'all')}
              className="mt-6 md:mt-0 px-6 py-3 border-b-2 border-black font-bold text-sm uppercase tracking-widest hover:text-blue-600 hover:border-blue-600 transition-colors"
            >
              See All Products
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onNavigate={onNavigate} 
                onCompare={() => onCompare(product)}
                isComparing={compareList.some(cp => cp.id === product.id)}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-2xl">
               <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Limited Time Offer</span>
               <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Upgrade Your <br/>Lifestyle.</h2>
               <p className="text-xl text-slate-300 mb-8 font-light">Get up to 20% off on premium kitchen bundles until the end of the month.</p>
               <button onClick={() => onNavigate('category', '3')} className="bg-white text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
                  Shop Kitchen
               </button>
            </div>
        </div>
      </section>

      <Testimonials />
      <ShowroomMap />
    </motion.div>
  );
};

export default HomePage;
