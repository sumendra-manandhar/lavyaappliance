
import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Aarav S.",
    role: "Interior Designer",
    text: "ElectroStream has completely transformed how I source appliances for my luxury projects. The variant options are unmatched.",
    rating: 5
  },
  {
    id: 2,
    name: "Priya M.",
    role: "Homeowner",
    text: "The consultation service helped me pick the perfect washer-dryer combo for my apartment. Installation was seamless.",
    rating: 5
  },
  {
    id: 3,
    name: "Rajesh K.",
    role: "Hotel Manager",
    text: "We ordered 50+ units of smart TVs for our boutique hotel. The corporate pricing and after-sales support were exceptional.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Trusted by Professionals</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">See what architects, designers, and homeowners have to say about the ElectroStream experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-shadow"
            >
              <div className="flex mb-4 text-yellow-400">
                {[...Array(t.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 italic mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{t.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
