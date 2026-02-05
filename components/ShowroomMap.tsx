
import React from 'react';

const ShowroomMap: React.FC = () => {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
             <span className="text-blue-500 font-black text-xs uppercase tracking-widest mb-3 block">Visit Us</span>
             <h2 className="text-4xl font-black text-white tracking-tight mb-6">Experience it Live</h2>
             <p className="text-slate-400 text-lg mb-8 leading-relaxed">
               Touch, feel, and test our premium range at our flagship experience center. Our engineers are on standby to give you a personalized walkthrough.
             </p>
             
             <div className="space-y-6">
               <div className="flex items-start">
                 <div className="bg-slate-800 p-3 rounded-xl mr-4 text-white">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                 </div>
                 <div>
                   <h4 className="text-white font-bold">ElectroStream Tower</h4>
                   <p className="text-slate-500 text-sm">Durbar Marg, Kathmandu, Nepal</p>
                 </div>
               </div>
               
               <div className="flex items-start">
                 <div className="bg-slate-800 p-3 rounded-xl mr-4 text-white">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 </div>
                 <div>
                   <h4 className="text-white font-bold">Opening Hours</h4>
                   <p className="text-slate-500 text-sm">Sunday - Friday: 10:00 AM - 7:00 PM</p>
                 </div>
               </div>
             </div>
          </div>

          <div className="h-[400px] w-full bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3688863691656!2d85.3175!3d27.705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190000000001%3A0x1!2sDurbar%20Marg%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1650000000000!5m2!1sen!2snp" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowroomMap;
