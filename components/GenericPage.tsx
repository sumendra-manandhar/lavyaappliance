
import React from 'react';
import { PageContent } from '../types';
import { motion } from 'framer-motion';

interface GenericPageProps {
  content: PageContent;
}

const GenericPage: React.FC<GenericPageProps> = ({ content }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-20 bg-white min-h-[60vh]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3 block">ElectroStream Info</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">{content.title}</h1>
          {content.subtitle && <p className="text-xl text-slate-500 font-medium">{content.subtitle}</p>}
        </div>
        
        <div 
          className="prose prose-lg prose-slate mx-auto prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </motion.div>
  );
};

export default GenericPage;
