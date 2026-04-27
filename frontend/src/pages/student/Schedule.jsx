import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { scheduleData } from '../../mock/schedule';

export const StudentSchedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-mono text-3xl font-bold text-[#3E2C23] mb-6">Schedule</h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-[#D2B48C]/40">
            <thead>
              <tr className="border-b border-[#D2B48C]/40 bg-[#E6D8C3]">
                <th className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-[#3E2C23]">
                  Time
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className={`px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-[#3E2C23] border-l border-[#D2B48C]/40 ${
                      new Date().toLocaleDateString('en-US', { weekday: 'long' }) === day
                        ? 'border-t-4 border-t-accent'
                        : ''
                    }`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                '09:00-10:00',
                '10:15-11:15',
                '11:30-12:30',
                '01:30-02:30',
                '02:30-03:30',
              ].map((time) => (
                <tr key={time} className="border-b border-[#D2B48C]/40">
                  <td className="px-4 py-3 font-mono text-xs text-[#3E2C23] border-r border-[#D2B48C]/40">
                    {time}
                  </td>
                  {days.map((day) => {
                    const dayKey = day.toLowerCase();
                    const schedule =
                      scheduleData[dayKey]?.find((s) =>
                        s.time.startsWith(time.split('-')[0])
                      ) || {};

                    return (
                      <td
                        key={`${day}-${time}`}
                        className="px-4 py-3 text-[#3E2C23] text-sm border-l border-[#D2B48C]/40 hover:bg-[#E6D8C3] transition-colors"
                      >
                        {schedule.subject && (
                          <>
                            <div className="font-mono font-bold">{schedule.subject}</div>
                            <div className="text-xs text-[#6F4E37]">
                              {schedule.teacher}
                            </div>
                            <div className="text-xs text-[#A67B5B]">{schedule.room}</div>
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};
