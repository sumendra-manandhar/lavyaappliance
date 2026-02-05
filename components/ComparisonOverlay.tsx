
import React from 'react';
import { Product, ViewState } from '../types';

interface ComparisonOverlayProps {
  compareList: Product[];
  onRemove: (id: string) => void;
  onNavigate: (view: ViewState) => void;
}

const ComparisonOverlay: React.FC<ComparisonOverlayProps> = ({ compareList, onRemove, onNavigate }) => {
  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-2xl">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 flex items-center justify-between">
        <div className="flex -space-x-3">
          {compareList.map((p) => (
            <div key={p.id} className="relative group">
              <img 
                src={p.variants[0].images[0]} 
                alt={p.name} 
                className="w-12 h-12 rounded-full border-2 border-slate-900 bg-white object-contain p-1"
              />
              <button 
                onClick={() => onRemove(p.id)}
                className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-white">
            <span className="text-sm font-bold">{compareList.length}</span>
            <span className="text-slate-400 text-xs ml-1">Items for Comparison</span>
          </div>
          <button 
            onClick={() => onNavigate('compare')}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl text-sm font-black transition-all active:scale-95"
          >
            Compare Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonOverlay;
