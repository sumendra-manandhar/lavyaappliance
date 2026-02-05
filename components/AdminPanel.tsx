
import React, { useState } from 'react';
import { Product, Category, ViewState, Variant, Spec } from '../types';

interface AdminPanelProps {
  products: Product[];
  categories: Category[];
  onUpdateProducts: (products: Product[]) => void;
  onUpdateCategories: (categories: Category[]) => void;
  onNavigate: (view: ViewState) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, 
  categories, 
  onUpdateProducts, 
  onUpdateCategories,
  onNavigate 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories'>('dashboard');

  // Login Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Credentials. Try admin/admin');
    }
  };

  // --- ANALYTICS ---
  const totalStockValue = products.reduce((acc, p) => acc + (p.variants.reduce((vAcc, v) => vAcc + (v.price * v.stock), 0)), 0);
  const totalStockCount = products.reduce((acc, p) => acc + (p.variants.reduce((vAcc, v) => vAcc + v.stock, 0)), 0);
  const lowStockProducts = products.filter(p => p.variants.some(v => v.stock < 5));

  // --- CRUD STATE ---
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalTab, setProductModalTab] = useState<'general' | 'variants'>('general');
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // --- HELPER FUNCTIONS FOR PRODUCT EDITING ---
  
  const handleVariantChange = (index: number, field: keyof Variant, value: any) => {
    if (!editingProduct) return;
    const updatedVariants = [...editingProduct.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setEditingProduct({ ...editingProduct, variants: updatedVariants });
  };

  const handleSpecChange = (variantIndex: number, specIndex: number, field: keyof Spec, value: string) => {
    if (!editingProduct) return;
    const updatedVariants = [...editingProduct.variants];
    const updatedSpecs = [...updatedVariants[variantIndex].specs];
    updatedSpecs[specIndex] = { ...updatedSpecs[specIndex], [field]: value };
    updatedVariants[variantIndex] = { ...updatedVariants[variantIndex], specs: updatedSpecs };
    setEditingProduct({ ...editingProduct, variants: updatedVariants });
  };

  const addSpec = (variantIndex: number) => {
    if (!editingProduct) return;
    const updatedVariants = [...editingProduct.variants];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      specs: [...updatedVariants[variantIndex].specs, { label: '', value: '' }]
    };
    setEditingProduct({ ...editingProduct, variants: updatedVariants });
  };

  const removeSpec = (variantIndex: number, specIndex: number) => {
    if (!editingProduct) return;
    const updatedVariants = [...editingProduct.variants];
    const updatedSpecs = updatedVariants[variantIndex].specs.filter((_, i) => i !== specIndex);
    updatedVariants[variantIndex] = { ...updatedVariants[variantIndex], specs: updatedSpecs };
    setEditingProduct({ ...editingProduct, variants: updatedVariants });
  };

  const handleImageChange = (variantIndex: number, imageIndex: number, value: string) => {
    if (!editingProduct) return;
    const updatedVariants = [...editingProduct.variants];
    const updatedImages = [...updatedVariants[variantIndex].images];
    updatedImages[imageIndex] = value;
    updatedVariants[variantIndex] = { ...updatedVariants[variantIndex], images: updatedImages };
    setEditingProduct({ ...editingProduct, variants: updatedVariants });
  };

  const addImage = (variantIndex: number) => {
    if (!editingProduct) return;
    const updatedVariants = [...editingProduct.variants];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      images: [...updatedVariants[variantIndex].images, '']
    };
    setEditingProduct({ ...editingProduct, variants: updatedVariants });
  };

  const removeImage = (variantIndex: number, imageIndex: number) => {
    if (!editingProduct) return;
    const updatedVariants = [...editingProduct.variants];
    const updatedImages = updatedVariants[variantIndex].images.filter((_, i) => i !== imageIndex);
    updatedVariants[variantIndex] = { ...updatedVariants[variantIndex], images: updatedImages };
    setEditingProduct({ ...editingProduct, variants: updatedVariants });
  };

  const addVariant = () => {
    if (!editingProduct) return;
    const newVariant: Variant = {
      id: `v-${Date.now()}`,
      variantName: 'New Variant',
      price: 0,
      sku: `SKU-${Date.now()}`,
      images: ['https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80'],
      specs: [{ label: 'Feature', value: 'Value' }],
      stock: 0,
      color: '#000000',
      finishName: 'Standard'
    };
    setEditingProduct({ ...editingProduct, variants: [...editingProduct.variants, newVariant] });
    setActiveVariantIndex(editingProduct.variants.length); // Switch to new variant
  };

  const removeVariant = (index: number) => {
    if (!editingProduct || editingProduct.variants.length <= 1) {
      alert("A product must have at least one variant.");
      return;
    }
    if (confirm("Delete this variant?")) {
      const updatedVariants = editingProduct.variants.filter((_, i) => i !== index);
      setEditingProduct({ ...editingProduct, variants: updatedVariants });
      setActiveVariantIndex(0);
    }
  };


  // --- CRUD HANDLERS (Product) ---
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (products.find(p => p.id === editingProduct.id)) {
      // Edit
      onUpdateProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
    } else {
      // Create
      onUpdateProducts([...products, editingProduct]);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
    setProductModalTab('general');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      onUpdateProducts(products.filter(p => p.id !== id));
    }
  };

  const initNewProduct = () => {
    const newVariant: Variant = {
        id: `v-${Date.now()}`,
        variantName: 'Standard',
        price: 0,
        sku: `SKU-${Date.now()}`,
        images: ['https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80'],
        specs: [{ label: 'Feature', value: 'Details' }],
        stock: 0,
        color: '#000000',
        finishName: 'Standard'
    };
    setEditingProduct({
        id: `p-${Date.now()}`,
        name: '',
        slug: '',
        brand: '',
        description: '',
        categoryId: categories[0]?.id || '',
        categoryName: categories[0]?.name || '',
        variants: [newVariant],
        featured: false
    });
    setProductModalTab('general');
    setIsProductModalOpen(true);
  };

  // --- CRUD HANDLERS (Category) ---
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (categories.find(c => c.id === editingCategory.id)) {
      onUpdateCategories(categories.map(c => c.id === editingCategory.id ? editingCategory : c));
    } else {
      onUpdateCategories([...categories, editingCategory]);
    }
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Delete category? This will not delete products in it.')) {
      onUpdateCategories(categories.filter(c => c.id !== id));
    }
  };

  const initNewCategory = () => {
    setEditingCategory({
        id: `${categories.length + 1}`,
        name: '',
        slug: '',
        icon: '📦',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
    });
    setIsCategoryModalOpen(true);
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900">CMS Login</h2>
            <p className="text-slate-500">Secure Admin Access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-blue-600 transition-colors">
              Access Dashboard
            </button>
            <button type="button" onClick={() => onNavigate('home')} className="w-full text-slate-400 text-sm font-bold hover:text-slate-600">
              Return to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-['Inter']">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-400 p-6 flex flex-col fixed h-full z-20">
        <div className="mb-10 text-white font-black text-xl tracking-tight">ElectroCMS</div>
        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
          >
            Products
          </button>
          <button 
            onClick={() => setActiveTab('categories')} 
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'categories' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'}`}
          >
            Categories
          </button>
        </nav>
        <button onClick={() => onNavigate('home')} className="mt-auto flex items-center text-sm font-bold hover:text-white transition-colors">
           <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
           Exit CMS
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
           <h1 className="text-3xl font-black text-slate-900 capitalize">{activeTab} Overview</h1>
           <div className="flex items-center space-x-4">
             <div className="bg-white px-4 py-2 rounded-full text-sm font-bold border border-slate-200">Admin User</div>
           </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Inventory Value</div>
                <div className="text-3xl font-black text-slate-900">NPR {totalStockValue.toLocaleString()}</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Products</div>
                <div className="text-3xl font-black text-slate-900">{products.length} Items</div>
                <div className="text-xs text-green-500 font-bold mt-1">Across {categories.length} Categories</div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                 <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Low Stock Alerts</div>
                 <div className="text-3xl font-black text-red-500">{lowStockProducts.length} Items</div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Traffic Analytics (Mock)</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {[45, 60, 30, 80, 55, 90, 70, 65, 40, 75, 50, 85].map((h, i) => (
                  <div key={i} className="w-full bg-blue-100 rounded-t-lg relative group">
                    <div className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg transition-all duration-500 group-hover:bg-blue-500" style={{ height: `${h}%` }}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-xs font-bold text-slate-400 uppercase">
                <span>Jan</span><span>Dec</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-end mb-6">
               <button onClick={initNewProduct} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                 + Add New Product
               </button>
            </div>
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
               <table className="w-full text-left">
                 <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Product</th>
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Base Price</th>
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Stock</th>
                      <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                   {products.map(p => (
                     <tr key={p.id} className="hover:bg-slate-50">
                       <td className="p-6">
                         <div className="font-bold text-slate-900">{p.name}</div>
                         <div className="text-xs text-slate-500">{p.brand}</div>
                       </td>
                       <td className="p-6 text-sm font-medium">{p.categoryName}</td>
                       <td className="p-6 text-sm font-bold text-slate-900">NPR {p.variants[0].price.toLocaleString()}</td>
                       <td className="p-6">
                         <span className={`px-3 py-1 rounded-full text-xs font-bold ${p.variants[0].stock < 5 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                           {p.variants[0].stock} Units
                         </span>
                       </td>
                       <td className="p-6 text-right">
                         <button onClick={() => { setEditingProduct(p); setActiveVariantIndex(0); setIsProductModalOpen(true); }} className="text-blue-600 font-bold text-sm mr-4 hover:underline">Edit</button>
                         <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 font-bold text-sm hover:underline">Delete</button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div>
            <div className="flex justify-end mb-6">
               <button onClick={initNewCategory} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                 + Add New Category
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {categories.map(c => (
                 <div key={c.id} className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-lg transition-all relative group">
                    <button onClick={() => handleDeleteCategory(c.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                    <div className="text-4xl mb-4">{c.icon}</div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{c.name}</h3>
                    <p className="text-xs text-slate-500 font-bold uppercase">{products.filter(p => p.categoryId === c.id).length} Products</p>
                    <button onClick={() => { setEditingCategory(c); setIsCategoryModalOpen(true); }} className="mt-4 w-full py-2 bg-slate-50 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50">Edit Details</button>
                 </div>
               ))}
            </div>
          </div>
        )}
      </main>

      {/* Product Modal */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                 <h2 className="text-2xl font-black text-slate-900">{products.find(p => p.id === editingProduct.id) ? 'Edit Product' : 'New Product'}</h2>
                 <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                 </button>
              </div>
              
              <div className="flex border-b border-slate-100">
                 <button 
                    onClick={() => setProductModalTab('general')}
                    className={`flex-1 py-4 font-bold text-sm uppercase tracking-widest transition-colors ${productModalTab === 'general' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-400 hover:bg-slate-50'}`}
                 >
                    General Info
                 </button>
                 <button 
                    onClick={() => setProductModalTab('variants')}
                    className={`flex-1 py-4 font-bold text-sm uppercase tracking-widest transition-colors ${productModalTab === 'variants' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' : 'text-slate-400 hover:bg-slate-50'}`}
                 >
                    Variants Management ({editingProduct.variants.length})
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
                 <form id="productForm" onSubmit={handleSaveProduct} className="space-y-6">
                    {productModalTab === 'general' && (
                       <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Product Name</label>
                                <input required className="w-full border border-slate-200 rounded-xl p-3 bg-white font-bold" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Brand</label>
                                <input required className="w-full border border-slate-200 rounded-xl p-3 bg-white font-bold" value={editingProduct.brand} onChange={e => setEditingProduct({...editingProduct, brand: e.target.value})} />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-6">
                             <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                                <select 
                                  className="w-full border border-slate-200 rounded-xl p-3 bg-white font-bold"
                                  value={editingProduct.categoryId}
                                  onChange={e => {
                                     const cat = categories.find(c => c.id === e.target.value);
                                     setEditingProduct({...editingProduct, categoryId: e.target.value, categoryName: cat?.name || ''});
                                  }}
                                >
                                   {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                             </div>
                             <div>
                                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">URL Slug</label>
                                <input className="w-full border border-slate-200 rounded-xl p-3 bg-white font-medium text-slate-500" value={editingProduct.slug} onChange={e => setEditingProduct({...editingProduct, slug: e.target.value})} placeholder="auto-generated-slug" />
                             </div>
                          </div>

                          <div>
                             <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
                             <textarea className="w-full border border-slate-200 rounded-xl p-3 bg-white font-medium min-h-[120px]" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} />
                          </div>

                          <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-slate-200">
                              <input 
                                type="checkbox" 
                                id="featured"
                                className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                checked={editingProduct.featured || false}
                                onChange={e => setEditingProduct({...editingProduct, featured: e.target.checked})}
                              />
                              <label htmlFor="featured" className="font-bold text-slate-900 cursor-pointer">Mark as Featured Product</label>
                          </div>
                       </div>
                    )}

                    {productModalTab === 'variants' && (
                       <div className="flex gap-8 h-full min-h-[400px]">
                          {/* Variant List Sidebar */}
                          <div className="w-1/3 space-y-3">
                             {editingProduct.variants.map((v, idx) => (
                                <div 
                                  key={idx}
                                  onClick={() => setActiveVariantIndex(idx)}
                                  className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${activeVariantIndex === idx ? 'border-blue-600 bg-white shadow-md' : 'border-transparent hover:bg-slate-200'}`}
                                >
                                   <div className="flex justify-between items-center mb-1">
                                      <span className="font-bold text-slate-900 text-sm">{v.variantName}</span>
                                      {editingProduct.variants.length > 1 && (
                                        <button type="button" onClick={(e) => { e.stopPropagation(); removeVariant(idx); }} className="text-red-400 hover:text-red-600">✕</button>
                                      )}
                                   </div>
                                   <div className="text-xs text-slate-500">SKU: {v.sku}</div>
                                </div>
                             ))}
                             <button type="button" onClick={addVariant} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold hover:border-blue-400 hover:text-blue-500 transition-colors">
                                + Add Variant
                             </button>
                          </div>

                          {/* Selected Variant Form */}
                          <div className="flex-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-y-auto max-h-[500px]">
                             <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Variant Name</label>
                                    <input className="w-full border border-slate-200 rounded-lg p-2 font-bold text-sm" value={editingProduct.variants[activeVariantIndex].variantName} onChange={e => handleVariantChange(activeVariantIndex, 'variantName', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">SKU</label>
                                    <input className="w-full border border-slate-200 rounded-lg p-2 font-bold text-sm" value={editingProduct.variants[activeVariantIndex].sku} onChange={e => handleVariantChange(activeVariantIndex, 'sku', e.target.value)} />
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Price (NPR)</label>
                                    <input type="number" className="w-full border border-slate-200 rounded-lg p-2 font-bold text-sm" value={editingProduct.variants[activeVariantIndex].price} onChange={e => handleVariantChange(activeVariantIndex, 'price', parseInt(e.target.value))} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Stock</label>
                                    <input type="number" className="w-full border border-slate-200 rounded-lg p-2 font-bold text-sm" value={editingProduct.variants[activeVariantIndex].stock} onChange={e => handleVariantChange(activeVariantIndex, 'stock', parseInt(e.target.value))} />
                                </div>
                             </div>
                             
                             <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-3">Appearance</label>
                                <div className="flex gap-4">
                                   <div className="flex-1">
                                      <input type="color" className="w-full h-10 rounded cursor-pointer" value={editingProduct.variants[activeVariantIndex].color} onChange={e => handleVariantChange(activeVariantIndex, 'color', e.target.value)} />
                                   </div>
                                   <div className="flex-[2]">
                                      <input className="w-full border border-slate-200 rounded-lg p-2 text-sm" placeholder="Finish Name (e.g. Matte Black)" value={editingProduct.variants[activeVariantIndex].finishName} onChange={e => handleVariantChange(activeVariantIndex, 'finishName', e.target.value)} />
                                   </div>
                                </div>
                             </div>

                             <div className="mb-6">
                                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-3">Images (URLs)</label>
                                <div className="space-y-2">
                                   {editingProduct.variants[activeVariantIndex].images.map((img, i) => (
                                      <div key={i} className="flex gap-2">
                                         <input className="flex-1 border border-slate-200 rounded-lg p-2 text-xs text-slate-600" value={img} onChange={e => handleImageChange(activeVariantIndex, i, e.target.value)} />
                                         <button type="button" onClick={() => removeImage(activeVariantIndex, i)} className="text-red-400 hover:text-red-600 px-2 font-bold">×</button>
                                      </div>
                                   ))}
                                   <button type="button" onClick={() => addImage(activeVariantIndex)} className="text-xs font-bold text-blue-600 hover:underline">+ Add Image URL</button>
                                </div>
                             </div>

                             <div>
                                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-3">Specifications</label>
                                <div className="space-y-2">
                                   {editingProduct.variants[activeVariantIndex].specs.map((spec, sIdx) => (
                                      <div key={sIdx} className="flex gap-2">
                                         <input className="flex-1 border border-slate-200 rounded-lg p-2 text-xs font-bold" placeholder="Label" value={spec.label} onChange={e => handleSpecChange(activeVariantIndex, sIdx, 'label', e.target.value)} />
                                         <input className="flex-1 border border-slate-200 rounded-lg p-2 text-xs" placeholder="Value" value={spec.value} onChange={e => handleSpecChange(activeVariantIndex, sIdx, 'value', e.target.value)} />
                                         <button type="button" onClick={() => removeSpec(activeVariantIndex, sIdx)} className="text-red-400 hover:text-red-600 px-2 font-bold">×</button>
                                      </div>
                                   ))}
                                   <button type="button" onClick={() => addSpec(activeVariantIndex)} className="text-xs font-bold text-blue-600 hover:underline">+ Add Specification</button>
                                </div>
                             </div>
                          </div>
                       </div>
                    )}
                 </form>
              </div>

              <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-4">
                 <button type="button" onClick={() => setIsProductModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-900">Cancel</button>
                 <button type="submit" form="productForm" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200">Save Product</button>
              </div>
           </div>
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-3xl p-8 w-full max-w-lg">
              <h2 className="text-2xl font-black text-slate-900 mb-6">Edit Category</h2>
              <form onSubmit={handleSaveCategory} className="space-y-4">
                 <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category Name</label>
                    <input required className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50 font-bold" value={editingCategory.name} onChange={e => setEditingCategory({...editingCategory, name: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Icon (Emoji)</label>
                    <input required className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50 font-bold" value={editingCategory.icon} onChange={e => setEditingCategory({...editingCategory, icon: e.target.value})} />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700">Save</button>
                    <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="px-6 py-3 font-bold text-slate-500 hover:text-slate-900">Cancel</button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
};

export default AdminPanel;
