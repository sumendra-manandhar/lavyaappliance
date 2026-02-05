
import React, { useState, useMemo } from 'react';
import { Product, Category, ViewState, Variant, Spec } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminPageProps {
  products: Product[];
  categories: Category[];
  onAddProduct: (p: Product) => Promise<void>;
  onUpdateProduct: (p: Product) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  onAddCategory: (c: Category) => Promise<void>;
  onUpdateCategory: (c: Category) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  onNavigate: (view: ViewState) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ 
  products, 
  categories, 
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
  onNavigate 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'categories'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // --- CRUD STATE ---
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productModalTab, setProductModalTab] = useState<'general' | 'variants'>('general');
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // --- LOGIN HANDLER ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Credentials. Try admin/admin');
    }
  };

  // --- ANALYTICS ---
  const stats = useMemo(() => {
    const totalValue = products.reduce((acc, p) => acc + (p.variants.reduce((vAcc, v) => vAcc + (v.price * v.stock), 0)), 0);
    const totalStock = products.reduce((acc, p) => acc + (p.variants.reduce((vAcc, v) => vAcc + v.stock, 0)), 0);
    const lowStock = products.filter(p => p.variants.some(v => v.stock < 5)).length;
    const totalVariants = products.reduce((acc, p) => acc + p.variants.length, 0);
    
    // Sort products by clicks
    const topProducts = [...products].sort((a, b) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 12);
    const maxClicks = Math.max(...topProducts.map(p => p.clicks || 0), 1); // Avoid division by zero

    return { totalValue, totalStock, lowStock, totalVariants, topProducts, maxClicks };
  }, [products]);

  // --- PRODUCT HELPER FUNCTIONS ---
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
    setActiveVariantIndex(editingProduct.variants.length);
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

  // --- CRUD ACTIONS ---
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    // Check if it's an existing product (update) or new (create)
    const isExisting = products.find(p => p.id === editingProduct.id);
    
    if (isExisting) {
      await onUpdateProduct(editingProduct);
    } else {
      await onAddProduct(editingProduct);
    }
    
    setIsProductModalOpen(false);
    setEditingProduct(null);
    setProductModalTab('general');
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await onDeleteProduct(id);
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
        featured: false,
        clicks: 0
    });
    setProductModalTab('general');
    setIsProductModalOpen(true);
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    const isExisting = categories.find(c => c.id === editingCategory.id);
    
    if (isExisting) {
        await onUpdateCategory(editingCategory);
    } else {
        await onAddCategory(editingCategory);
    }
    
    setIsCategoryModalOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Delete category?')) {
        await onDeleteCategory(id);
    }
  };

  const initNewCategory = () => {
    setEditingCategory({
        id: `${categories.length + 1}`, // In real API, ID is generated by backend usually, but for local mock we can do this or let backend handle it
        name: '',
        slug: '',
        icon: '📦',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
        clicks: 0
    });
    setIsCategoryModalOpen(true);
  };

  // --- RENDER LOGIN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full"></div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl relative z-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">ElectroCMS</h2>
            <p className="text-slate-400">Authenticate to access dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform active:scale-[0.98]">
              Login
            </button>
            <button type="button" onClick={() => onNavigate('home')} className="w-full text-slate-500 text-sm font-bold hover:text-white transition-colors mt-4">
              ← Return to Storefront
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER DASHBOARD ---
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex font-['Inter'] transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-900 dark:bg-slate-950 text-slate-400 flex flex-col fixed h-full z-30 shadow-2xl border-r border-slate-800">
        <div className="p-8">
           <div className="flex items-center space-x-3 text-white mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">E</div>
              <span className="font-black text-xl tracking-tight">ElectroCMS</span>
           </div>
           <div className="text-xs font-bold uppercase text-slate-600 dark:text-slate-500 mb-4">Main Menu</div>
           <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                { id: 'products', label: 'Products', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
                { id: 'categories', label: 'Categories', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl font-bold transition-all duration-200 ${
                    activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                  <span>{item.label}</span>
                </button>
              ))}
           </nav>
        </div>
        
        <div className="mt-auto p-8 border-t border-slate-800">
           <button onClick={() => onNavigate('home')} className="flex items-center space-x-3 text-sm font-bold hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              <span>Exit to Website</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-8 lg:p-12 overflow-y-auto">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-12">
           <div>
             <h1 className="text-3xl font-black text-slate-900 dark:text-white capitalize tracking-tight">{activeTab}</h1>
             <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your store's ecosystem</p>
           </div>
           
           <div className="flex items-center space-x-6">
              <div className="relative hidden md:block">
                 <input 
                   type="text" 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   placeholder="Global Search..." 
                   className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64 shadow-sm dark:text-white"
                 />
                 <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <div className="flex items-center space-x-3 pl-6 border-l border-slate-200 dark:border-slate-800">
                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">A</div>
                 <div className="text-sm">
                    <div className="font-bold text-slate-900 dark:text-white">Admin User</div>
                    <div className="text-slate-400 text-xs">Super Admin</div>
                 </div>
              </div>
           </div>
        </header>

        {activeTab === 'dashboard' && (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                 { label: 'Total Inventory', value: `NPR ${stats.totalValue.toLocaleString()}`, color: 'bg-blue-500' },
                 { label: 'Total Products', value: products.length, color: 'bg-emerald-500' },
                 { label: 'Active Variants', value: stats.totalVariants, color: 'bg-violet-500' },
                 { label: 'Low Stock Items', value: stats.lowStock, color: 'bg-rose-500' },
               ].map((stat, i) => (
                 <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-3 h-3 ${stat.color} rounded-full mb-4`}></div>
                    <div className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                 </div>
               ))}
            </div>

            {/* Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="font-bold text-lg text-slate-900 dark:text-white">Engagement Analytics (Top Clicks)</h3>
                     <select className="text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1 outline-none dark:text-white">
                        <option>Real-Time</option>
                     </select>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-4">
                     {stats.topProducts.map((p, i) => (
                       <div key={i} className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-xl relative group overflow-hidden" title={`${p.name}: ${p.clicks || 0} clicks`}>
                          <div 
                            className="absolute bottom-0 w-full bg-slate-900 dark:bg-blue-500 rounded-t-xl transition-all duration-700 ease-out group-hover:bg-blue-600 dark:group-hover:bg-blue-400" 
                            style={{ height: `${((p.clicks || 0) / stats.maxClicks) * 100}%` }}
                          ></div>
                       </div>
                     ))}
                  </div>
                  <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                     <span>Top Product</span>
                     <span>Lower Engagement</span>
                  </div>
               </div>
               
               <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-3xl text-white flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full"></div>
                  <h3 className="font-bold text-lg mb-6 relative z-10">Popular Categories</h3>
                  <div className="space-y-4 relative z-10 overflow-y-auto max-h-64 no-scrollbar">
                     {[...categories].sort((a,b) => (b.clicks || 0) - (a.clicks || 0)).slice(0, 5).map((c, i) => (
                        <div key={c.id} className="flex items-center justify-between">
                           <div className="flex items-center space-x-3">
                              <span className="text-lg">{c.icon}</span>
                              <span className="text-sm font-bold text-slate-300">{c.name}</span>
                           </div>
                           <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-lg">{c.clicks || 0}</span>
                        </div>
                     ))}
                  </div>
                  <button className="relative z-10 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors mt-auto pt-4">
                     Full Report
                  </button>
               </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'products' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
             <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                   <span className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400">All ({products.length})</span>
                   <span className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-400 dark:text-slate-600">Drafts (0)</span>
                </div>
                <button onClick={initNewProduct} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-none transition-all flex items-center">
                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                   Add Product
                </button>
             </div>

             <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <tr>
                         <th className="px-8 py-5 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Item</th>
                         <th className="px-8 py-5 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Category</th>
                         <th className="px-8 py-5 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Pricing</th>
                         <th className="px-8 py-5 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Views</th>
                         <th className="px-8 py-5 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Status</th>
                         <th className="px-8 py-5 text-right text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => (
                        <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                           <td className="px-8 py-5">
                              <div className="flex items-center space-x-4">
                                 <div className="w-12 h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 flex-shrink-0">
                                    <img src={p.variants[0]?.images[0]} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                 </div>
                                 <div>
                                    <div className="font-bold text-slate-900 dark:text-white text-sm">{p.name}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">{p.brand} • {p.variants.length} Variants</div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-5">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300">
                                {p.categoryName}
                              </span>
                           </td>
                           <td className="px-8 py-5 text-sm font-bold text-slate-900 dark:text-white">
                              NPR {p.variants[0].price.toLocaleString()}
                           </td>
                           <td className="px-8 py-5 text-sm font-bold text-slate-600 dark:text-slate-400">
                              {p.clicks || 0}
                           </td>
                           <td className="px-8 py-5">
                              <div className="flex items-center space-x-2">
                                 <div className={`w-2 h-2 rounded-full ${p.variants[0].stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                 <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{p.variants[0].stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                              </div>
                           </td>
                           <td className="px-8 py-5 text-right">
                              <div className="flex justify-end space-x-2">
                                 <button onClick={() => { setEditingProduct(p); setActiveVariantIndex(0); setIsProductModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                 </button>
                                 <button 
                                    type="button"
                                    onClick={(e) => { 
                                        e.preventDefault(); 
                                        e.stopPropagation(); 
                                        handleDeleteProduct(p.id); 
                                    }} 
                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                 >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                 </button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </motion.div>
        )}

        {activeTab === 'categories' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}>
            <div className="flex justify-end mb-6">
               <button onClick={initNewCategory} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-200 dark:shadow-none transition-all">
                 + Add Category
               </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {categories.map(c => (
                 <div key={c.id} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all relative group cursor-pointer" onClick={() => { setEditingCategory(c); setIsCategoryModalOpen(true); }}>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={(e) => {e.stopPropagation(); handleDeleteCategory(c.id)}} className="text-slate-300 hover:text-red-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                       </button>
                    </div>
                    <div className="text-4xl mb-4 bg-slate-50 dark:bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center">{c.icon}</div>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{c.name}</h3>
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                        <span>{products.filter(p => p.categoryId === c.id).length} Products</span>
                        <span className="text-blue-500">{c.clicks || 0} Views</span>
                    </div>
                 </div>
               ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Product Editing Modal */}
      <AnimatePresence>
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsProductModalOpen(false)}></motion.div>
           
           <motion.div 
             initial={{opacity:0, scale:0.95}} 
             animate={{opacity:1, scale:1}} 
             exit={{opacity:0, scale:0.95}} 
             className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl relative z-10 overflow-hidden"
           >
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
                 <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">{products.find(p => p.id === editingProduct.id) ? 'Edit Product' : 'Create Product'}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Configure product details, variants, and stock.</p>
                 </div>
                 <div className="flex space-x-3">
                    <button onClick={() => setIsProductModalOpen(false)} className="px-4 py-2 font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm">Cancel</button>
                    <button onClick={handleSaveProduct} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 text-sm shadow-lg shadow-blue-200 dark:shadow-none">Save Changes</button>
                 </div>
              </div>

              {/* Modal Tabs */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
                 {['general', 'variants'].map((tab) => (
                   <button 
                      key={tab}
                      onClick={() => setProductModalTab(tab as any)}
                      className={`px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all border-b-2 ${
                        productModalTab === tab 
                        ? 'border-blue-600 text-blue-600 bg-blue-50/50 dark:bg-slate-800' 
                        : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                   >
                      {tab}
                   </button>
                 ))}
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50 dark:bg-slate-950">
                {productModalTab === 'general' ? (
                   <div className="max-w-3xl mx-auto space-y-8">
                      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
                          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase">Basic Information</h3>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Product Name</label>
                                <input className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} placeholder="e.g. Samsung Neo QLED" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Brand</label>
                                <input className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white" value={editingProduct.brand} onChange={e => setEditingProduct({...editingProduct, brand: e.target.value})} placeholder="e.g. Samsung" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Category</label>
                                <select 
                                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-800 dark:text-white"
                                  value={editingProduct.categoryId}
                                  onChange={e => {
                                     const cat = categories.find(c => c.id === e.target.value);
                                     setEditingProduct({...editingProduct, categoryId: e.target.value, categoryName: cat?.name || ''});
                                  }}
                                >
                                   {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Description</label>
                                <textarea className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] dark:bg-slate-800 dark:text-white" value={editingProduct.description} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} placeholder="Product description..." />
                            </div>
                          </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-sm">
                          <div>
                             <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase">Featured Status</h3>
                             <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Highlight this product on the homepage</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={editingProduct.featured || false} onChange={e => setEditingProduct({...editingProduct, featured: e.target.checked})} className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                      </div>
                   </div>
                ) : (
                   <div className="flex gap-8 h-full">
                      {/* Sidebar */}
                      <div className="w-64 flex-shrink-0 space-y-4">
                         <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xs font-black text-slate-400 uppercase">Variants</h3>
                            <button onClick={addVariant} className="text-blue-600 text-xs font-bold hover:underline">+ Add</button>
                         </div>
                         <div className="space-y-2">
                             {editingProduct.variants.map((v, idx) => (
                                <div 
                                  key={idx}
                                  onClick={() => setActiveVariantIndex(idx)}
                                  className={`p-4 rounded-xl cursor-pointer border-2 transition-all ${activeVariantIndex === idx ? 'border-blue-600 bg-white dark:bg-slate-800 shadow-lg shadow-blue-100 dark:shadow-none' : 'border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 bg-white dark:bg-slate-900'}`}
                                >
                                   <div className="flex justify-between items-center mb-1">
                                      <span className="font-bold text-slate-900 dark:text-white text-sm truncate w-32">{v.variantName}</span>
                                      {editingProduct.variants.length > 1 && (
                                        <button type="button" onClick={(e) => { e.stopPropagation(); removeVariant(idx); }} className="text-slate-300 hover:text-red-500">×</button>
                                      )}
                                   </div>
                                   <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">SKU: {v.sku}</div>
                                </div>
                             ))}
                         </div>
                      </div>

                      {/* Variant Form */}
                      <div className="flex-1 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-y-auto">
                         <div className="grid grid-cols-2 gap-6 mb-8">
                            <div className="col-span-2">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Variant Name</label>
                                <input className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-bold dark:bg-slate-800 dark:text-white" value={editingProduct.variants[activeVariantIndex].variantName} onChange={e => handleVariantChange(activeVariantIndex, 'variantName', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Price (NPR)</label>
                                <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-bold dark:bg-slate-800 dark:text-white" value={editingProduct.variants[activeVariantIndex].price} onChange={e => handleVariantChange(activeVariantIndex, 'price', parseInt(e.target.value))} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Stock Quantity</label>
                                <input type="number" className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm font-bold dark:bg-slate-800 dark:text-white" value={editingProduct.variants[activeVariantIndex].stock} onChange={e => handleVariantChange(activeVariantIndex, 'stock', parseInt(e.target.value))} />
                            </div>
                         </div>
                         
                         <div className="mb-8">
                             <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Visuals & Finish</h4>
                             <div className="grid grid-cols-2 gap-6">
                                <div>
                                   <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Finish Name</label>
                                   <input className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm dark:bg-slate-800 dark:text-white" value={editingProduct.variants[activeVariantIndex].finishName} onChange={e => handleVariantChange(activeVariantIndex, 'finishName', e.target.value)} />
                                </div>
                                <div>
                                   <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">Color Swatch</label>
                                   <div className="flex items-center space-x-3">
                                      <input type="color" className="h-11 w-20 rounded cursor-pointer border border-slate-200 dark:border-slate-700" value={editingProduct.variants[activeVariantIndex].color} onChange={e => handleVariantChange(activeVariantIndex, 'color', e.target.value)} />
                                      <span className="text-xs text-slate-400 font-mono">{editingProduct.variants[activeVariantIndex].color}</span>
                                   </div>
                                </div>
                             </div>
                             
                             <div className="mt-4">
                                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">Image URLs</label>
                                <div className="space-y-2">
                                   {editingProduct.variants[activeVariantIndex].images.map((img, i) => (
                                      <div key={i} className="flex gap-2">
                                         <input className="flex-1 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-600 dark:text-slate-300 font-mono dark:bg-slate-800" value={img} onChange={e => handleImageChange(activeVariantIndex, i, e.target.value)} />
                                         <button type="button" onClick={() => removeImage(activeVariantIndex, i)} className="text-red-400 hover:text-red-600 px-2 font-bold">×</button>
                                      </div>
                                   ))}
                                   <button type="button" onClick={() => addImage(activeVariantIndex)} className="text-xs font-bold text-blue-600 hover:underline mt-1">+ Add Image</button>
                                </div>
                             </div>
                         </div>

                         <div>
                             <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Technical Specs</h4>
                             <div className="space-y-2">
                                {editingProduct.variants[activeVariantIndex].specs.map((spec, sIdx) => (
                                  <div key={sIdx} className="grid grid-cols-5 gap-2">
                                     <div className="col-span-2">
                                       <input className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs font-bold dark:bg-slate-800 dark:text-white" placeholder="Label (e.g. Screen)" value={spec.label} onChange={e => handleSpecChange(activeVariantIndex, sIdx, 'label', e.target.value)} />
                                     </div>
                                     <div className="col-span-2">
                                       <input className="w-full border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-xs dark:bg-slate-800 dark:text-white" placeholder="Value (e.g. OLED)" value={spec.value} onChange={e => handleSpecChange(activeVariantIndex, sIdx, 'value', e.target.value)} />
                                     </div>
                                     <button type="button" onClick={() => removeSpec(activeVariantIndex, sIdx)} className="text-red-400 hover:text-red-600 font-bold px-2">×</button>
                                  </div>
                                ))}
                                <button type="button" onClick={() => addSpec(activeVariantIndex)} className="text-xs font-bold text-blue-600 hover:underline mt-2">+ Add Spec</button>
                             </div>
                         </div>
                      </div>
                   </div>
                )}
              </div>
           </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* Category Modal */}
      <AnimatePresence>
      {isCategoryModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsCategoryModalOpen(false)}></motion.div>
           <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:20}} className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-md relative z-10 shadow-2xl">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Edit Category</h2>
              <form onSubmit={handleSaveCategory} className="space-y-5">
                 <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Category Name</label>
                    <input required className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white" value={editingCategory.name} onChange={e => setEditingCategory({...editingCategory, name: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">Icon (Emoji)</label>
                    <input required className="w-full border border-slate-200 dark:border-slate-700 rounded-xl p-3 font-bold focus:ring-2 focus:ring-blue-500 outline-none dark:bg-slate-800 dark:text-white" value={editingCategory.icon} onChange={e => setEditingCategory({...editingCategory, icon: e.target.value})} />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsCategoryModalOpen(false)} className="flex-1 py-3 font-bold text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 rounded-xl transition-colors">Cancel</button>
                    <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all">Save</button>
                 </div>
              </form>
           </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default AdminPage;
