
import React, { useState } from 'react';
import { Product, Variant } from '../types';

interface InquiryFormProps {
  product: Product;
  variant: Variant;
}

const InquiryForm: React.FC<InquiryFormProps> = ({ product, variant }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call to Resend / Backend
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 p-8 rounded-2xl text-center">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-xl font-bold text-green-900 dark:text-green-300">Inquiry Sent Successfully</h3>
        <p className="text-green-700 dark:text-green-400 mt-2">Our technical sales team will contact you within 24 hours regarding the {product.name} ({variant.variantName}).</p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-6 text-green-700 dark:text-green-300 font-bold hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Request a Quote</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Get the best price for {product.name} in Nepal.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Full Name</label>
            <input required type="text" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" placeholder="John Doe" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase">Phone</label>
            <input required type="tel" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" placeholder="98XXXXXXXX" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
          <input required type="email" className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white" placeholder="john@example.com" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-400 uppercase">Message (Optional)</label>
          <textarea className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24 dark:text-white" placeholder="Ask about warranty, delivery or discount..."></textarea>
        </div>

        <button 
          disabled={status === 'loading'}
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center"
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              Processing...
            </>
          ) : 'Check Availability'}
        </button>
        
        <p className="text-[10px] text-center text-slate-400 mt-2 italic">
          * Your inquiry will be sent directly to our firm's sales dashboard.
        </p>
      </form>
    </div>
  );
};

export default InquiryForm;
