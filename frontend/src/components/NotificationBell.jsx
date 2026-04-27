import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { announcementsData } from '../mock/announcements';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const markAsRead = () => {
    setUnreadCount(0);
  };

  const recentAnnouncements = announcementsData.slice(0, 3);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-[#3E2C23] hover:text-[#A67B5B] transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-[#a855f7] text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="absolute right-0 mt-2 w-80 bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 z-50">
            <div className="border-b border-[#D2B48C]/40 px-4 py-3">
              <h3 className="font-mono text-xs text-[#3E2C23] tracking-widest uppercase font-bold">Latest Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {recentAnnouncements.length === 0 ? (
                <div className="px-4 py-6 text-center text-[#6F4E37]">No notifications</div>
              ) : (
                recentAnnouncements.map((ann) => (
                  <div key={ann.id} className="border-b border-[#D2B48C]/40 px-4 py-3 hover:bg-[#E6D8C3] transition-colors">
                    <p className="text-[#3E2C23] text-sm font-mono font-bold line-clamp-1">{ann.title}</p>
                    <p className="text-[#6F4E37] text-xs font-mono mt-1">{ann.postedBy}</p>
                  </div>
                ))
              )}
            </div>
            {unreadCount > 0 && (
              <div className="border-t border-[#D2B48C]/40 px-4 py-2">
                <button
                  onClick={markAsRead}
                  className="w-full text-[#A67B5B] font-mono text-xs tracking-widest uppercase hover:text-[#3E2C23] transition-colors"
                >
                  Mark as Read
                </button>
              </div>
            )}
          </div>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
        </>
      )}
    </div>
  );
};
