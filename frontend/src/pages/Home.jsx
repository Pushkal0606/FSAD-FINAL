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
    <div className="min-h-screen bg-[#F5EFE6] flex flex-col relative overflow-hidden z-0">
      <BGPattern variant="interactive-dots" fill="#D2B48C" size={35} className="" />
      <header className="border-b border-[#D2B48C] px-6 py-4 flex justify-between items-center z-10">
        <div className="font-mono text-sm font-bold text-[#3E2C23] tracking-widest bg-[#F5EFE6]/70 backdrop-blur-md px-3 py-1 rounded-sm border border-[#D2B48C]">EDUCORE</div>
        <div className="font-mono text-xs text-[#3E2C23] tracking-widest bg-[#F5EFE6]/70 backdrop-blur-md px-3 py-1 rounded-sm border border-[#D2B48C]">FSAD-PS13 // Select your role to continue</div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 z-10 pointer-events-none">
        <h1 className="font-syne text-5xl md:text-6xl font-bold text-[#3E2C23] mb-4 text-center bg-[#F5EFE6]/70 backdrop-blur-md p-4 rounded-sm border border-[#D2B48C] pointer-events-auto shadow-sm">
          Select Your Role
        </h1>
        <p className="font-mono text-xs tracking-widest text-[#8B6F5C] italic mb-12 bg-[#F5EFE6]/70 backdrop-blur-md px-4 py-2 rounded-sm border border-[#D2B48C] pointer-events-auto">
          Choose your path and access your academic space
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl z-10 pointer-events-auto">
          {roles.map((role, idx) => (
            <div
              key={idx}
              className="border border-[#D2B48C]/40 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <RoleCard {...role} />
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-[#D2B48C] px-6 py-4 text-center z-10">
        <div className="font-mono text-xs text-[#3E2C23] tracking-widest bg-[#F5EFE6]/70 backdrop-blur-md inline-block px-4 py-2 rounded-sm border border-[#D2B48C]">
          FSAD-PS13 · EDUCORE · 2025
        </div>
      </footer>
    </div>
  );
};
