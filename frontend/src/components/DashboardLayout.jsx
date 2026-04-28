import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BGPattern } from './BGPattern';

export const DashboardLayout = ({ children }) => {
 const [sidebarOpen, setSidebarOpen] = useState(false);

 return (
 <div className="flex bg-black min-h-screen relative overflow-hidden z-0">
 <BGPattern variant="interactive-dots" fill="#4c1d95" size={35} className="z-[-1]" />
 <div className="z-40 pointer-events-auto">
 <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
 </div>
 <div className="flex-1 md:ml-0 z-10 relative pointer-events-none">
 <div className="pointer-events-auto">
 <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
 </div>
 <main className="pt-20 p-4 md:p-6 w-full pointer-events-auto">
 {children}
 </main>
 </div>
 </div>
 );
};
