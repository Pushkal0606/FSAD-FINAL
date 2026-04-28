import React from 'react';

export const Modal = ({ isOpen, onClose, title, children, footerActions }) => {
 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-50 bg-black rounded-sm/80 flex items-center justify-center">
 <div className="bg-black rounded-sm border border-[#333] w-full max-w-md">
 <div className="border-b border-[#333] px-6 py-4 flex justify-between items-center">
 <h2 className="font-mono font-bold text-white text-lg">{title}</h2>
 <button onClick={onClose} className="text-gray-400 hover:text-[#a855f7] transition-colors">✕</button>
 </div>
 <div className="px-6 py-4">
 {children}
 </div>
 {footerActions && (
 <div className="border-t border-[#333] px-6 py-4 flex gap-2 justify-end">
 {footerActions}
 </div>
 )}
 </div>
 </div>
 );
};
