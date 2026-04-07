import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import { resourcesData } from '../../mock/resources';

export const ResourceManagement = () => {
  const [resources, setResources] = useState(resourcesData);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '', capacity: '', status: 'AVAILABLE' });

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'text-[#A67B5B]';
      case 'OCCUPIED':
        return 'text-[#3E2C23]';
      case 'MAINTENANCE':
        return 'text-[#6F4E37]';
      default:
        return 'text-[#3E2C23]';
    }
  };

  const handleCreate = () => {
    if (formData.name && formData.type && formData.capacity) {
      setResources([
        {
          id: Date.now(),
          name: formData.name,
          type: formData.type,
          capacity: parseInt(formData.capacity),
          status: formData.status,
        },
        ...resources,
      ]);
      setFormData({ name: '', type: '', capacity: '', status: 'AVAILABLE' });
      setModalOpen(false);
    }
  };

  const handleDelete = (id) => {
    setResources(resources.filter((r) => r.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-syne text-3xl font-bold text-[#3E2C23]">Resource Management</h1>
          <button
            onClick={() => {
              setIsCreating(true);
              setFormData({ name: '', type: '', capacity: '', status: 'AVAILABLE' });
              setModalOpen(true);
            }}
            className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-white text-[#3E2C23] font-mono text-sm px-4 py-2 hover:bg-accent hover:text-black hover:border-[#A67B5B] transition-all"
          >
            Add Resource
          </button>
        </div>

        <div className="overflow-x-auto border border-[#D2B48C]/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D2B48C]/40 bg-[#E6D8C3]">
                {['Name', 'Type', 'Capacity', 'Status', 'Actions'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-[#3E2C23]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resources.map((resource) => (
                <tr
                  key={resource.id}
                  className="border-b border-[#D2B48C]/40 hover:bg-[#E6D8C3] hover:border-l-4 hover:border-l-[#A67B5B] transition-all"
                >
                  <td className="px-4 py-3 text-[#3E2C23] text-sm">{resource.name}</td>
                  <td className="px-4 py-3 text-[#3E2C23] text-sm font-mono">{resource.type}</td>
                  <td className="px-4 py-3 text-[#3E2C23] text-sm">{resource.capacity}</td>
                  <td className={`px-4 py-3 font-mono text-xs uppercase ${getStatusColor(resource.status)}`}>
                    {resource.status}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="text-[#A67B5B] hover:text-[#3E2C23] font-mono text-xs transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(resource.id)}
                      className="text-[#6F4E37] hover:text-red-400 font-mono text-xs transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isCreating ? 'Add Resource' : 'Edit Resource'}
        footerActions={
          <>
            <button
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 border border-[#D2B48C]/40 text-[#3E2C23] hover:border-[#A67B5B] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-accent text-black hover:bg-white transition-colors font-mono text-sm"
            >
              {isCreating ? 'Add' : 'Update'}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              Type
            </label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              Capacity
            </label>
            <input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            >
              {['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
