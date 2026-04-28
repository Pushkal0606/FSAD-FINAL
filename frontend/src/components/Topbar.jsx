import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, LogOut } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { Modal } from './Modal';

export const Topbar = ({ onMenuClick }) => {
 const navigate = useNavigate();
 const location = useLocation();
 const { user, logout } = useAuth();
 const [showLogoutModal, setShowLogoutModal] = useState(false);

 const getBreadcrumb = () => {
 const path = location.pathname;
 const segments = path.split('/').filter(Boolean);
 if (segments.length === 0) return 'Home';

 return segments
 .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
 .join(' / ');
 };

 const handleLogout = () => {
 logout();
 navigate('/');
 setShowLogoutModal(false);
 };

 return (
 <div className="bg-black rounded-sm border-b border-[#333] px-4 md:px-6 py-4 flex items-center justify-between fixed top-0 right-0 left-0 z-20 md:left-56">
 <div className="flex items-center gap-4">
 <button
 onClick={onMenuClick}
 className="md:hidden text-white hover:text-[#a855f7] transition-colors"
 >
 <Menu size={24} />
 </button>
 <div className="font-mono text-xs tracking-widest uppercase text-gray-400">
 {getBreadcrumb()}
 </div>
 </div>

 <div className="flex items-center gap-4">
 <NotificationBell />
 <div className="text-white font-mono text-xs">{user?.name || 'User'}</div>
 <div className="w-8 h-8 bg-[#111] border border-[#a855f7] flex items-center justify-center font-mono text-xs font-bold text-[#a855f7]">
 {user?.name?.split(' ').map((n) => n[0]).join('') || 'U'}
 </div>
 <button
 onClick={() => setShowLogoutModal(true)}
 className="text-white hover:text-[#a855f7] transition-colors"
 >
 <LogOut size={18} />
 </button>
 </div>

 <Modal
 isOpen={showLogoutModal}
 onClose={() => setShowLogoutModal(false)}
 title="Confirm Logout"
 footerActions={
 <>
 <button
 onClick={() => setShowLogoutModal(false)}
 className="px-4 py-2 border border-[#333] text-white hover:border-[#a855f7] transition-colors font-mono text-sm"
 >
 Cancel
 </button>
 <button
 onClick={handleLogout}
 className="px-4 py-2 bg-[#3E2C23] text-white hover:bg-purple-700 transition-colors font-mono text-sm"
 >
 Logout
 </button>
 </>
 }
 >
 <p className="text-white font-mono text-sm">Are you sure you want to log out of your academic space?</p>
 </Modal>
 </div>
 );
};
