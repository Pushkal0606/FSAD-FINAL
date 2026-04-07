import React, { useState } from 'react';
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
        <h1 className="font-syne text-3xl font-bold text-[#3E2C23] mb-6">My Profile</h1>

        <div className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-[#E6D8C3] border-4 border-[#A67B5B] flex items-center justify-center font-syne text-4xl font-bold text-[#A67B5B] mb-4">
                {profile.avatar}
              </div>
              {!isEditing && (
                <button
                  onClick={() => {
                    setTempProfile({ ...profile });
                    setIsEditing(true);
                  }}
                  className="font-mono text-xs tracking-widest uppercase text-[#A67B5B] hover:text-[#3E2C23] border border-[#A67B5B] hover:border-white transition-colors px-4 py-2 mt-2"
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
                    <label className="block font-mono text-xs tracking-widest uppercase text-[#6F4E37] mb-1">
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
                        className="w-full bg-[#E6D8C3] border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
                      />
                    ) : (
                      <p className="text-[#3E2C23] font-mono">{profile[field.key]}</p>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2 mt-6">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-accent text-black hover:bg-white transition-colors font-mono text-sm px-4 py-2 font-bold"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 text-[#3E2C23] hover:border-[#A67B5B] transition-colors font-mono text-sm px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
