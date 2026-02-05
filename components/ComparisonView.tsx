
import React from 'react';
import { Product, ViewState } from '../types';

interface ComparisonViewProps {
  products: Product[];
  onNavigate: (view: ViewState, id?: string) => void;
  onClose: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ products, onNavigate, onClose }) => {
  const allSpecs = Array.from(new Set(products.flatMap(p => p.variants[0].specs.map(s => s.label))));

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Product Comparison</h1>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 font-bold uppercase text-xs tracking-widest">
            Back to Catalog
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-6 text-left w-1/4 border-b border-slate-100 bg-slate-50/50 rounded-tl-3xl font-black uppercase text-xs text-slate-400">Features</th>
                {products.map((p) => (
                  <th key={p.id} className="p-6 text-center w-1/4 border-b border-slate-100 min-w-[280px]">
                    <div className="space-y-4">
                      <div className="aspect-square w-32 mx-auto bg-slate-50 rounded-2xl p-4 cursor-pointer" onClick={() => onNavigate('product', p.id)}>
                        <img src={p.variants[0].images[0]} alt={p.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{p.brand}</span>
                        <h3 className="font-black text-slate-900 leading-tight mt-1">{p.name}</h3>
                        <p className="text-blue-600 font-black mt-2">NPR {p.variants[0].price.toLocaleString()}</p>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-6 bg-slate-50/50 font-bold text-slate-900">Description</td>
                {products.map(p => (
                  <td key={p.id} className="p-6 text-center text-sm text-slate-500 italic">{p.description}</td>
                ))}
              </tr>
              {allSpecs.map((label) => (
                <tr key={label}>
                  <td className="p-6 bg-slate-50/50 font-bold text-slate-900">{label}</td>
                  {products.map(p => {
                    const specValue = p.variants[0].specs.find(s => s.label === label)?.value || '-';
                    return (
                      <td key={p.id} className="p-6 text-center font-bold text-slate-700">{specValue}</td>
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

export default ComparisonView;
