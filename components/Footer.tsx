
import React from 'react';
import { ViewState } from '../types';

interface FooterProps {
  onNavigate: (view: ViewState, id?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="bg-blue-600 p-2 rounded-lg text-white font-black text-xl mr-3">ES</div>
              <span className="text-2xl font-black tracking-tight text-white">ELECTROSTREAM</span>
            </div>
            <p className="text-sm leading-relaxed">
              Nepal's leading premium electronics distributor. We bridge the gap between global technology and local homes since 2024.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">F</div>
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">I</div>
              <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">X</div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Divisions</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => onNavigate('category', '1')} className="hover:text-blue-500 transition-colors">TV & Entertainment</button></li>
              <li><button onClick={() => onNavigate('category', '3')} className="hover:text-blue-500 transition-colors">Kitchen Appliances</button></li>
              <li><button onClick={() => onNavigate('category', '2')} className="hover:text-blue-500 transition-colors">Smart Laundry</button></li>
              <li><button onClick={() => onNavigate('category', '5')} className="hover:text-blue-500 transition-colors">Cooling Solutions</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => onNavigate('page', 'about')} className="hover:text-blue-500 transition-colors">About Our Firm</button></li>
              <li><button onClick={() => onNavigate('page', 'corporate')} className="hover:text-blue-500 transition-colors">Corporate Sales</button></li>
              <li><button onClick={() => onNavigate('page', 'warranty')} className="hover:text-blue-500 transition-colors">Warranty Policy</button></li>
              <li><button onClick={() => onNavigate('page', 'contact')} className="hover:text-blue-500 transition-colors">Showroom Locator</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => onNavigate('page', 'service')} className="hover:text-blue-500 transition-colors">Service Center</button></li>
              <li><button onClick={() => onNavigate('page', 'service')} className="hover:text-blue-500 transition-colors">Track Inquiry</button></li>
              <li><button onClick={() => onNavigate('page', 'faq')} className="hover:text-blue-500 transition-colors">FAQ</button></li>
              <li><button onClick={() => onNavigate('page', 'contact')} className="hover:text-blue-500 transition-colors">Contact Us</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0 uppercase tracking-widest font-bold">
          <p>© 2026 ElectroStream. Custom Developed with Next.js & Tailwind CSS.</p>
          <div className="flex space-x-6">
            <button onClick={() => onNavigate('admin')} className="hover:text-blue-500 text-slate-700">Admin Login</button>
            <button onClick={() => onNavigate('page', 'privacy')} className="hover:text-white">Privacy</button>
            <button onClick={() => onNavigate('page', 'terms')} className="hover:text-white">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
