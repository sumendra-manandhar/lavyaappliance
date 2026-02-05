
import React, { useState } from 'react';
import { Product, Variant, ViewState } from '../types';
import InquiryForm from './InquiryForm';
import { motion } from 'framer-motion';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onNavigate: (view: ViewState, id?: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, allProducts, onNavigate }) => {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(product.variants[0]);
  const [activeImage, setActiveImage] = useState(0);

  // Filter recommended products: same category, different ID
  const recommendedProducts = allProducts.filter(
    p => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex mb-12 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] items-center">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition-colors">Home</button>
          <span className="mx-3 opacity-30">/</span>
          <button onClick={() => onNavigate('category', product.categoryId)} className="hover:text-blue-600 transition-colors">{product.categoryName}</button>
          <span className="mx-3 opacity-30">/</span>
          <span className="text-slate-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
          <div className="lg:col-span-7 space-y-10">
            <motion.div 
              key={selectedVariant.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[4/3] bg-slate-50 rounded-[3rem] overflow-hidden relative group border border-slate-100"
            >
              <img 
                src={selectedVariant.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-contain p-12 mix-blend-multiply transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-10 left-10 flex space-x-3">
                <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{product.brand}</span>
              </div>
            </motion.div>
            
            <div className="flex gap-6 justify-center">
              {selectedVariant.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-24 h-24 rounded-3xl bg-slate-50 border-2 overflow-hidden transition-all p-3 ${activeImage === idx ? 'border-blue-600 shadow-xl shadow-blue-100' : 'border-transparent hover:border-slate-200'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="mb-10">
              <span className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4 block">Product Overview</span>
              <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-6">
                {product.name}
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="flex items-baseline space-x-4 mb-10">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">NPR {selectedVariant.price.toLocaleString()}</span>
              <span className="text-slate-300 line-through text-xl font-medium">NPR {(selectedVariant.price * 1.15).toLocaleString()}</span>
            </div>

            <div className="space-y-8 mb-12">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Configuration</h3>
                <div className="flex flex-wrap gap-4">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                          setSelectedVariant(v);
                          setActiveImage(0);
                      }}
                      className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border-2 ${
                        selectedVariant.id === v.id 
                        ? 'border-blue-600 bg-white text-blue-600' 
                        : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {v.variantName}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-6 pt-8 border-t border-slate-100">
                  {selectedVariant.specs.map((spec, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</span>
                      <span className="font-bold text-slate-900 text-lg tracking-tight">{spec.value}</span>
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stock ID</span>
                    <span className="font-bold text-slate-900 text-lg tracking-tight">{selectedVariant.sku}</span>
                  </div>
              </div>
            </div>

            <div className="mt-auto">
               <InquiryForm product={product} variant={selectedVariant} />
            </div>
          </div>
        </div>

        {/* Visual Highlights Section */}
        <section className="py-20 border-t border-slate-100">
          <div className="mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Visual Highlights</h2>
            <p className="text-slate-500 max-w-2xl">Explore the fine details that make the {product.name} a masterpiece of modern engineering.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
             <div className="bg-slate-50 rounded-[2.5rem] p-12 aspect-square flex items-center justify-center">
                <img src={selectedVariant.images[0]} className="max-w-full max-h-full object-contain mix-blend-multiply scale-125" />
             </div>
             <div>
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3 block">01 — Design</span>
                <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Seamless Integration</h3>
                <p className="text-lg text-slate-500 leading-relaxed mb-8">
                  Designed to blend perfectly into your living space. The {selectedVariant.finishName} finish offers a premium touch that resists fingerprints and smudges, ensuring your appliance looks as good as it performs.
                </p>
                <div className="flex items-center space-x-2 text-sm font-bold text-slate-900">
                  <div className="w-6 h-6 rounded-full border border-slate-300" style={{backgroundColor: selectedVariant.color}}></div>
                  <span>{selectedVariant.finishName} Finish</span>
                </div>
             </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="order-2 md:order-1">
                <span className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3 block">02 — Performance</span>
                <h3 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Engineered for Excellence</h3>
                <p className="text-lg text-slate-500 leading-relaxed">
                  Every component is tested for durability and efficiency. Whether it's the {selectedVariant.specs[0]?.label} of {selectedVariant.specs[0]?.value} or the intelligent core processor, this device is built to exceed industry standards by 40%.
                </p>
             </div>
             <div className="order-1 md:order-2 bg-slate-900 rounded-[2.5rem] p-12 aspect-square flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20"></div>
                <img src={selectedVariant.images[0]} className="max-w-full max-h-full object-contain invert opacity-90 scale-110" />
             </div>
          </div>
        </section>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="py-20 border-t border-slate-100">
             <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-12">You Might Also Like</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recommendedProducts.map((p) => (
                  <div 
                    key={p.id} 
                    onClick={() => onNavigate('product', p.id)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-slate-50 rounded-3xl p-8 aspect-[4/3] mb-6 overflow-hidden border border-slate-100">
                      <img src={p.variants[0].images[0]} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"/>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                    <p className="text-slate-500 text-sm mt-1">NPR {p.variants[0].price.toLocaleString()}</p>
                  </div>
                ))}
             </div>
          </section>
        )}

      </div>
    </div>
  );
};

export default ProductDetail;
