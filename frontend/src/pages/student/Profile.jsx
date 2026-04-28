import React, { useState } from 'react';
import { AccountSettings } from '../../components/AccountSettings';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';

export const StudentProfile = () => {
 const [isEditing, setIsEditing] = useState(false);
 const [profile, setProfile] = useState({
 name: 'Aarav Kumar',
 email: 'student@eduerp.com',
 enrollmentId: 'STU001',
 department: 'Computer Science',
 class: '101',
 avatar: 'AK',
 });
 const [tempProfile, setTempProfile] = useState(profile);

 const handleSave = () => {
 setProfile({ ...tempProfile });
 setIsEditing(false);
 };

 return (
 <DashboardLayout>
 <div className="max-w-2xl">
 <h1 className="font-mono text-3xl font-bold text-white mb-6">My Profile</h1>

 <div className="bg-black rounded-sm border border-[#333] p-8">
 <div className="flex flex-col md:flex-row gap-8">
 {/* Avatar */}
 <div className="flex flex-col items-center">
 <div className="w-32 h-32 bg-[#111] border-4 border-[#a855f7] flex items-center justify-center font-mono text-4xl font-bold text-[#a855f7] mb-4">
 {profile.avatar}
 </div>
 {!isEditing && (
 <button
 onClick={() => {
 setTempProfile({ ...profile });
 setIsEditing(true);
 }}
 className="font-mono text-xs tracking-widest uppercase text-[#a855f7] hover:text-white border border-[#a855f7] hover:border-white transition-colors px-4 py-2 mt-2"
 >
 Edit Profile
 </button>
 )}
 </div>

 {/* Details */}
 <div className="flex-1">
 <div className="space-y-4">
 {[
 { label: 'Full Name', key: 'name' },
 { label: 'Email Address', key: 'email' },
 { label: 'Enrollment ID', key: 'enrollmentId' },
 { label: 'Department', key: 'department' },
 { label: 'Class', key: 'class' },
 ].map((field) => (
 <div key={field.key}>
 <label className="block font-mono text-xs tracking-widest uppercase text-gray-400 mb-1">
 {field.label}
 </label>
 {isEditing ? (
 <input
 value={tempProfile[field.key]}
 onChange={(e) =>
 setTempProfile({
 ...tempProfile,
 [field.key]: e.target.value,
 })
 }
 className="w-full bg-[#111] border border-[#555] px-3 py-2 text-white focus:border-[#a855f7] focus:outline-none transition-colors"
 />
 ) : (
 <p className="text-white font-mono">{profile[field.key]}</p>
 )}
 </div>
 ))}
 </div>

 {isEditing && (
 <div className="flex gap-2 mt-6">
 <button
 onClick={handleSave}
 className="flex-1 bg-[#a855f7] text-black hover:bg-black border border-[#333] transition-colors font-mono text-sm px-4 py-2 font-bold"
 >
 Save Changes
 </button>
 <button
 onClick={() => setIsEditing(false)}
 className="flex-1 bg-black rounded-sm border border-[#333] text-white hover:border-[#a855f7] transition-colors font-mono text-sm px-4 py-2"
 >
 Cancel
 </button>
 </div>
 )}
 <AccountSettings />
 </div>
 </div>
 </div>
 </div>
 </DashboardLayout>
 );
};
