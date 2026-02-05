
import React, { useState } from 'react';
import { ViewState } from '../types';
import { motion } from 'framer-motion';

interface HeaderProps {
  onNavigate: (view: ViewState, id?: string) => void;
  onGlobalSearch: (query: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onGlobalSearch, isDarkMode, toggleTheme }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGlobalSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">ELECTRO</span>
            <span className="text-2xl font-bold tracking-tighter text-blue-600">STREAM</span>
            <div className="w-2 h-2 bg-slate-900 dark:bg-white rounded-full ml-1 mt-3"></div>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-10 text-sm font-bold text-slate-600 dark:text-slate-400 tracking-wide uppercase">
            <button onClick={() => onNavigate('home')} className="hover:text-black dark:hover:text-white transition-colors">Home</button>
            <button onClick={() => onNavigate('category', 'all')} className="hover:text-black dark:hover:text-white transition-colors">Shop</button>
            <button onClick={() => onNavigate('page', 'about')} className="hover:text-black dark:hover:text-white transition-colors">Stories</button>
            <button onClick={() => onNavigate('page', 'contact')} className="hover:text-black dark:hover:text-white transition-colors">Support</button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              ) : (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              )}
            </button>

            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex relative group">
                <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 bg-transparent border-b border-slate-300 dark:border-slate-700 py-1 pr-6 text-sm focus:outline-none focus:border-black dark:focus:border-white focus:w-64 transition-all placeholder:text-slate-400 dark:text-white font-medium"
                />
                <button type="submit" className="absolute right-0 top-1 text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
            </form>
            
            <button 
              onClick={() => onNavigate('page', 'contact')} 
              className="text-xs font-black uppercase tracking-widest border border-black dark:border-white px-6 py-3 rounded-full hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
