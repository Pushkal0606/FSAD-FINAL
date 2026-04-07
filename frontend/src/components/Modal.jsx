import React from 'react';

export const Modal = ({ isOpen, onClose, title, children, footerActions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm/80 flex items-center justify-center">
      <div className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 w-full max-w-md">
        <div className="border-b border-[#D2B48C]/40 px-6 py-4 flex justify-between items-center">
          <h2 className="font-syne font-bold text-[#3E2C23] text-lg">{title}</h2>
          <button onClick={onClose} className="text-[#6F4E37] hover:text-[#A67B5B] transition-colors">✕</button>
        </div>
        <div className="px-6 py-4">
          {children}
        </div>
        {footerActions && (
          <div className="border-t border-[#D2B48C]/40 px-6 py-4 flex gap-2 justify-end">
            {footerActions}
          </div>
        )}
      </div>
    </div>
  );
};
