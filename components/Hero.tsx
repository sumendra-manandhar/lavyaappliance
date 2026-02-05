
import React from 'react';
import { motion } from 'framer-motion';
import { ViewState } from '../types';

interface HeroProps {
    onNavigate?: (view: ViewState, id?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative h-[85vh] bg-black overflow-hidden flex items-center">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=2400&q=80" 
          alt="Premium Living" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
             <span className="text-white/80 font-bold tracking-[0.3em] uppercase text-xs mb-6 block border-l-2 border-blue-500 pl-4">
               2026 Flagship Collection
             </span>
             <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter mb-8">
               Beyond <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Expectation.</span>
             </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl text-slate-300 max-w-xl leading-relaxed font-light mb-12 pl-1"
          >
            Experience the synergy of AI intelligence and bespoke design. Elevate your home with appliances engineered for the future.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button 
                onClick={() => onNavigate && onNavigate('category', 'all')}
                className="bg-white text-black px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1"
            >
              Shop Collection
            </button>
            <button 
                onClick={() => onNavigate && onNavigate('page', 'contact')}
                className="bg-transparent border border-white text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Find Showroom
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroller Indicator */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1.5, duration: 1 }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
      >
         <span className="text-[10px] uppercase tracking-widest opacity-70">Scroll</span>
         <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
