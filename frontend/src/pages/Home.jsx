import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, BarChart3, Settings } from 'lucide-react';
import { RoleCard } from '../components/RoleCard';
import { BGPattern } from '../components/BGPattern';

export const Home = () => {
 const navigate = useNavigate();

 const roles = [
 { icon: BookOpen, label: '01', sublabel: 'STUDENT', onClick: () => navigate('/login/student'), description: 'Access records, attendance, grades, and communicate with teachers.' },
 { icon: Users, label: '02', sublabel: 'TEACHER', onClick: () => navigate('/login/teacher'), description: 'Manage students, grade assignments, and schedule your classes.' },
 { icon: BarChart3, label: '03', sublabel: 'ADMIN', onClick: () => navigate('/login/admin'), description: 'Configure ERP settings, manage user roles, and oversee system operations.' },
 { icon: Settings, label: '04', sublabel: 'ADMINISTRATOR', onClick: () => navigate('/login/administrator'), description: 'Oversee institutional operations, manage resources, and generate reports.' },
 ];

 return (
 <div className="min-h-screen bg-black flex flex-col relative overflow-hidden z-0">
 <BGPattern variant="interactive-dots" fill="#4c1d95" size={35} className="" />
 <header className="border-b border-[#333] px-6 py-4 flex justify-between items-center z-10">
 <div className="font-mono text-sm font-bold text-white tracking-widest bg-black px-3 py-1 rounded-sm border border-[#333] uppercase">eduerp</div>
 <div className="font-mono text-xs text-white tracking-widest bg-black px-3 py-1 rounded-sm border border-[#333]">FSAD-PS13 // Select your role to continue</div>
 </header>

 <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 z-10 pointer-events-none">
 <h1 className="font-mono text-5xl md:text-6xl font-bold text-white mb-4 text-center bg-black p-4 rounded-sm border border-[#333] pointer-events-auto">
 Select Your Role
 </h1>
 <p className="font-mono text-xs tracking-widest text-gray-400 italic mb-12 bg-black px-4 py-2 rounded-sm border border-[#333] pointer-events-auto">
 Choose your path and access your academic space
 </p>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10 pointer-events-auto">
 {roles.map((role, idx) => (
 <div
 key={idx}
 className="border border-[#333] rounded-sm overflow-hidden transition-shadow"
 >
 <RoleCard {...role} />
 </div>
 ))}
 </div>
 </main>

 <footer className="border-t border-[#333] px-6 py-4 text-center z-10">
 <div className="font-mono text-xs text-white tracking-widest bg-black inline-block px-4 py-2 rounded-sm border border-[#333] uppercase">
 FSAD-PS13 · EDUERP · 2025
 </div>
 </footer>
 </div>
 );
};
