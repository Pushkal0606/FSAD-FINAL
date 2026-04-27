import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import { usersData } from '../../mock/users';

export const UserManagement = () => {
  const [users, setUsers] = useState(usersData);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'student', status: 'Active' });

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (formData.name && formData.email && formData.role) {
      setUsers([{ id: Date.now(), ...formData }, ...users]);
      setFormData({ name: '', email: '', role: 'student', status: 'Active' });
      setModalOpen(false);
    }
  };

  const handleDeactivate = (userId) => {
    setUsers(users.map((u) =>
      u.id === userId ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
    ));
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-mono text-3xl font-bold text-[#3E2C23]">User Management</h1>
          <button
            onClick={() => {
              setIsCreating(true);
              setFormData({ name: '', email: '', role: 'student', status: 'Active' });
              setModalOpen(true);
            }}
            className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-white text-[#3E2C23] font-mono text-sm px-4 py-2 hover:bg-[#a855f7] hover:text-black hover:border-[#A67B5B] transition-all"
          >
            Add User
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-4 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
          />
        </div>

        <div className="overflow-x-auto border border-[#D2B48C]/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D2B48C]/40 bg-[#E6D8C3]">
                {['Name', 'Email', 'Role', 'Status', 'Actions'].map((h) => (
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
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#D2B48C]/40 hover:bg-[#E6D8C3] hover:border-l-4 hover:border-l-[#A67B5B] transition-all"
                >
                  <td className="px-4 py-3 text-[#3E2C23] text-sm">{user.name}</td>
                  <td className="px-4 py-3 text-[#3E2C23] text-sm">{user.email}</td>
                  <td className="px-4 py-3 text-[#A67B5B] font-mono text-xs uppercase">{user.role}</td>
                  <td className="px-4 py-3">
                    <span className={`font-mono text-xs px-2 py-1 border ${
                      user.status === 'Active'
                        ? 'border-[#A67B5B] text-[#A67B5B]'
                        : 'border-[#555] text-[#6F4E37]'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setFormData(user);
                        setIsCreating(false);
                        setModalOpen(true);
                      }}
                      className="text-[#A67B5B] hover:text-[#3E2C23] font-mono text-xs transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeactivate(user.id)}
                      className="text-[#6F4E37] hover:text-red-400 font-mono text-xs transition-colors"
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
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
        title={isCreating ? 'Add User' : 'Edit User'}
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
              className="px-4 py-2 bg-[#a855f7] text-black hover:bg-black border border-[#333] transition-colors font-mono text-sm"
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
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            >
              {['student', 'teacher', 'admin', 'administrator'].map((r) => (
                <option key={r} value={r}>
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};
