
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
      className="py-20 bg-white dark:bg-slate-950 min-h-[60vh] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3 block">lavyaappliance Info</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{content.title}</h1>
          {content.subtitle && <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">{content.subtitle}</p>}
        </div>
        
        <div 
          className="prose prose-lg prose-slate dark:prose-invert mx-auto prose-headings:font-black prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      </div>
    </motion.div>
  );
};

export default GenericPage;
