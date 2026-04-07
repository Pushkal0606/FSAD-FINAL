import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { announcementsData } from '../../mock/announcements';

export const StudentAnnouncements = () => {
  const [filter, setFilter] = useState('all');
  const [announcements, setAnnouncements] = useState(announcementsData);

  const filtered = announcements.filter((ann) => {
    if (filter === 'all') return true;
    return ann.role === filter;
  });

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="font-syne text-3xl font-bold text-[#3E2C23] mb-6">Announcements</h1>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {['all', 'teacher', 'admin'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs tracking-widest uppercase px-3 py-2 border transition-colors ${
                filter === f
                  ? 'border-[#A67B5B] text-[#A67B5B] bg-[#E6D8C3]'
                  : 'border-[#D2B48C]/40 text-[#6F4E37] hover:border-[#A67B5B]'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Announcements */}
        <div className="space-y-3">
          {filtered.map((ann) => (
            <div key={ann.id} className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-4 hover:bg-[#E6D8C3] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-syne font-bold text-[#3E2C23]">{ann.title}</h3>
                <span className="font-mono text-xs text-[#A67B5B] tracking-widest uppercase">
                  {ann.role}
                </span>
              </div>
              <p className="text-[#3E2C23] text-sm mb-3">{ann.body}</p>
              <div className="font-mono text-xs text-[#6F4E37]">
                Posted by {ann.postedBy} · {new Date(ann.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
