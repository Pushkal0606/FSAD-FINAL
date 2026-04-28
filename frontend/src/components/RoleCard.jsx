import React from 'react';

export const RoleCard = ({ icon: Icon, label, sublabel, onClick, isActive, description }) => {
 return (
 <button
 onClick={onClick}
 className="w-full flex flex-col items-center justify-between p-8 border-0 bg-[#111] hover:bg-[#222] hover:border-[#a855f7] transition-colors duration-500 ease-in-out group min-h-64"
 >
 <div className="flex flex-col items-center flex-1 justify-start">
 <div className="text-gray-400 font-mono text-xs tracking-widest uppercase mb-4">
 {label} / {sublabel}
 </div>
 <Icon size={48} className="mb-6 text-white transition-colors duration-500 group-hover:text-[#a855f7]" />
 </div>

 <div className="flex flex-col items-center flex-1 justify-center">
 <h3 className="font-mono text-2xl md:text-3xl font-bold text-white mb-4 text-center group-hover:text-[#a855f7] transition-colors duration-500">
 {sublabel}
 </h3>
 <p className="text-gray-400 italic text-xs md:text-sm text-center leading-relaxed mb-8 px-2 transition-colors duration-500 group-hover:text-gray-300">
 {description || 'Access your portal'}
 </p>
 </div>

 <div className="text-[#a855f7] font-mono text-xs tracking-widest uppercase group-hover:text-purple-400 transition-colors duration-500">
 Enter →
 </div>
 </button>
 );
};
