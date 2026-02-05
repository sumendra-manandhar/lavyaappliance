
import React from 'react';
import { Product, ViewState } from '../types';

interface ComparisonPageProps {
  products: Product[];
  onNavigate: (view: ViewState, id?: string) => void;
  onClose: () => void;
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ products, onNavigate, onClose }) => {
  const allSpecs = Array.from(new Set(products.flatMap(p => p.variants[0].specs.map(s => s.label))));

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Product Comparison</h1>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold uppercase text-xs tracking-widest">
            Back to Catalog
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-6 text-left w-1/4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-tl-3xl font-black uppercase text-xs text-slate-400">Features</th>
                {products.map((p) => (
                  <th key={p.id} className="p-6 text-center w-1/4 border-b border-slate-100 dark:border-slate-800 min-w-[280px]">
                    <div className="space-y-4">
                      <div className="aspect-square w-32 mx-auto bg-slate-50 dark:bg-slate-900 rounded-2xl p-4 cursor-pointer" onClick={() => onNavigate('product', p.id)}>
                        <img src={p.variants[0].images[0]} alt={p.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 tracking-widest">{p.brand}</span>
                        <h3 className="font-black text-slate-900 dark:text-white leading-tight mt-1">{p.name}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-black mt-2">NPR {p.variants[0].price.toLocaleString()}</p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="p-6 bg-slate-50/50 dark:bg-slate-900/50 font-bold text-slate-900 dark:text-white">Description</td>
                {products.map(p => (
                  <td key={p.id} className="p-6 text-center text-sm text-slate-500 dark:text-slate-400 italic">{p.description}</td>
                ))}
              </tr>
              {allSpecs.map((label) => (
                <tr key={label}>
                  <td className="p-6 bg-slate-50/50 dark:bg-slate-900/50 font-bold text-slate-900 dark:text-white">{label}</td>
                  {products.map(p => {
                    const specValue = p.variants[0].specs.find(s => s.label === label)?.value || '-';
                    return (
                      <td key={p.id} className="p-6 text-center font-bold text-slate-700 dark:text-slate-300">{specValue}</td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
