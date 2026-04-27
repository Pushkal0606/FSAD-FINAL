import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';

export const Settings = () => {
  const [settings, setSettings] = useState({
    erpName: 'EDUERP',
    academicYear: '2024-2025',
    currentSemester: 'Spring 2025',
    institutionName: 'KL University',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);

  const handleSave = () => {
    setSettings({ ...tempSettings });
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        <h1 className="font-mono text-3xl font-bold text-[#3E2C23] mb-6">System Settings</h1>

        <div className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-8">
          <div className="space-y-6">
            {[
              { label: 'ERP Name', key: 'erpName' },
              { label: 'Academic Year', key: 'academicYear' },
              { label: 'Current Semester', key: 'currentSemester' },
              { label: 'Institution Name', key: 'institutionName' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block font-mono text-xs tracking-widest uppercase text-[#6F4E37] mb-2">
                  {field.label}
                </label>
                {isEditing ? (
                  <input
                    value={tempSettings[field.key]}
                    onChange={(e) =>
                      setTempSettings({
                        ...tempSettings,
                        [field.key]: e.target.value,
                      })
                    }
                    className="w-full bg-[#E6D8C3] border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
                  />
                ) : (
                  <p className="text-[#3E2C23] font-mono">{settings[field.key]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 mt-8">
            {!isEditing && (
              <button
                onClick={() => {
                  setTempSettings({ ...settings });
                  setIsEditing(true);
                }}
                className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-white text-[#3E2C23] font-mono text-sm px-6 py-2 hover:bg-[#a855f7] hover:text-black hover:border-[#A67B5B] transition-all"
              >
                Edit Settings
              </button>
            )}

            {isEditing && (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-[#a855f7] text-black hover:bg-black border border-[#333] transition-colors font-mono text-sm px-4 py-2 font-bold"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 text-[#3E2C23] hover:border-[#A67B5B] transition-colors font-mono text-sm px-4 py-2"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
