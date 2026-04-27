import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';

export const SystemAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'System Maintenance', body: 'Scheduled maintenance on Sunday', postedAt: new Date() },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', body: '' });

  const handleBroadcast = () => {
    if (formData.title && formData.body) {
      setAnnouncements([
        { id: Date.now(), title: formData.title, body: formData.body, postedAt: new Date() },
        ...announcements,
      ]);
      setFormData({ title: '', body: '' });
      setModalOpen(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-mono text-3xl font-bold text-[#3E2C23]">System Announcements</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-white text-[#3E2C23] font-mono text-sm px-4 py-2 hover:bg-[#a855f7] hover:text-black hover:border-[#A67B5B] transition-all"
          >
            Broadcast
          </button>
        </div>

        <div className="space-y-3">
          {announcements.map((ann) => (
            <div key={ann.id} className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-4 hover:bg-[#E6D8C3] transition-colors">
              <h3 className="font-mono font-bold text-[#3E2C23]">{ann.title}</h3>
              <p className="text-[#3E2C23] text-sm mt-2">{ann.body}</p>
              <div className="font-mono text-xs text-[#6F4E37] mt-2">
                Posted {new Date(ann.postedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Broadcast to All Users"
        footerActions={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-[#D2B48C]/40 text-[#3E2C23] hover:border-[#A67B5B] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleBroadcast}
              className="px-4 py-2 bg-[#a855f7] text-black hover:bg-black border border-[#333] transition-colors font-mono text-sm"
            >
              Broadcast
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              Message
            </label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
              rows="5"
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
