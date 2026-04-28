import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Modal } from './Modal';

export const AccountSettings = () => {
 const { user, deleteAccount, updatePassword } = useAuth();
 const [deleteModalOpen, setDeleteModalOpen] = useState(false);
 const [passwordModalOpen, setPasswordModalOpen] = useState(false);
 const [confirmModalOpen, setConfirmModalOpen] = useState(false);
 const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
 const [statusMsg, setStatusMsg] = useState('');

 const handleDelete = async () => {
 if (!user?.id) return setStatusMsg('User ID missing! Please log in again.');
 const res = await deleteAccount(user.id);
 if (!res.success) setStatusMsg(res.message);
 };

 const handlePasswordUpdate = async () => {
 if (!passwordForm.oldPassword) return setStatusMsg('Please enter your current password.');
 if (passwordForm.newPassword !== passwordForm.confirmPassword) return setStatusMsg('Passwords do not match!');
 if (!passwordForm.newPassword) return setStatusMsg('Please enter a valid password.');
 if (!user?.id) return setStatusMsg('User ID missing!');

 // If validation clears locally, open confirmation modal
 setConfirmModalOpen(true);
 };

 const confirmPasswordExecution = async () => {
 const res = await updatePassword(user.id, passwordForm.oldPassword, passwordForm.newPassword);
 if (res.success) {
 setConfirmModalOpen(false);
 setPasswordModalOpen(false);
 setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
 setStatusMsg('Password updated successfully!');
 setTimeout(() => setStatusMsg(''), 3000);
 } else {
 setConfirmModalOpen(false);
 setStatusMsg(res.message);
 }
 };

 return (
 <div className="mt-8 border-t border-[#333] pt-6">
 <h2 className="font-mono text-xl font-bold text-white mb-4">Account Security</h2>
 {statusMsg && <p className="text-gray-400 font-mono text-xs mb-4">{statusMsg}</p>}
 <div className="flex gap-4">
 <button
 onClick={() => setPasswordModalOpen(true)}
 className="px-4 py-2 bg-black border border-[#333] text-white hover:border-[#a855f7] transition-colors font-mono text-sm"
 >
 Update Password
 </button>
 <button
 onClick={() => setDeleteModalOpen(true)}
 className="px-4 py-2 bg-[#3E2C23] text-[#EDE3D2] border border-[#3E2C23] hover:bg-transparent hover:text-white hover:border-[#3E2C23] transition-colors font-mono text-sm font-bold"
 >
 Delete Account
 </button>
 </div>

 <Modal
 isOpen={deleteModalOpen}
 onClose={() => setDeleteModalOpen(false)}
 title="Confirm Account Deletion"
 footerActions={
 <>
 <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 border border-[#333] text-white hover:border-[#a855f7] transition-colors font-mono text-sm">Cancel</button>
 <button onClick={handleDelete} className="px-4 py-2 bg-[#3E2C23] text-white hover:bg-purple-700 transition-colors font-mono text-sm">Yes, Delete Everything</button>
 </>
 }
 >
 <p className="text-white font-mono text-sm">Are you absolutely sure you want to permanently delete your account? This action cannot be undone and will drop your database records securely.</p>
 </Modal>

 <Modal
 isOpen={passwordModalOpen}
 onClose={() => setPasswordModalOpen(false)}
 title="Update Password"
 footerActions={
 <>
 <button onClick={() => setPasswordModalOpen(false)} className="px-4 py-2 border border-[#333] text-white hover:border-[#a855f7] transition-colors font-mono text-sm">Cancel</button>
 <button onClick={handlePasswordUpdate} className="px-4 py-2 bg-[#a855f7] text-white hover:bg-[#3E2C23] transition-colors font-mono text-sm">Save Password</button>
 </>
 }
 >
 <div className="space-y-4">
 <div>
 <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">Current/Old Password</label>
 <input type="password" value={passwordForm.oldPassword} onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })} className="w-full bg-black rounded-sm border border-[#333] px-3 py-2 text-white focus:border-[#a855f7] focus:outline-none transition-colors" />
 </div>
 <div>
 <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">New Password</label>
 <input type="password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="w-full bg-black rounded-sm border border-[#333] px-3 py-2 text-white focus:border-[#a855f7] focus:outline-none transition-colors" />
 </div>
 <div>
 <label className="block font-mono text-xs tracking-widest uppercase text-white mb-2">Confirm New Password</label>
 <input type="password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} className="w-full bg-black rounded-sm border border-[#333] px-3 py-2 text-white focus:border-[#a855f7] focus:outline-none transition-colors" />
 </div>
 </div>
 </Modal>

 <Modal
 isOpen={confirmModalOpen}
 onClose={() => setConfirmModalOpen(false)}
 title="Confirm Password Change"
 footerActions={
 <>
 <button onClick={() => setConfirmModalOpen(false)} className="px-4 py-2 border border-[#333] text-white hover:border-[#a855f7] transition-colors font-mono text-sm">Cancel</button>
 <button onClick={confirmPasswordExecution} className="px-4 py-2 bg-[#3E2C23] text-white hover:bg-purple-700 transition-colors font-mono text-sm">Yes, Update Password</button>
 </>
 }
 >
 <p className="text-white font-mono text-sm">Are you absolutely sure you want to change your password? This will instantly override your existing credentials.</p>
 </Modal>
 </div>
 );
};
