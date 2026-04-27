import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { announcementsData } from '../../mock/announcements';
import { assignmentsData } from '../../mock/assignments';
import { attendanceData } from '../../mock/attendance';
import { Calendar, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';

export const StudentDashboard = () => {
  const [stats, setStats] = useState({
    todayClasses: 4,
    pendingAssignments: 0,
    attendancePercentage: 0,
    gpa: 0,
  });

  useEffect(() => {
    const pending = assignmentsData.length;
    const present = attendanceData.filter(
      (a) => a.status === 'PRESENT'
    ).length;
    const total = attendanceData.length;
    const percentage = Math.round((present / total) * 100);

    setStats({
      todayClasses: 4,
      pendingAssignments: pending,
      attendancePercentage: percentage,
      gpa: 3.82,
    });
  }, []);

  const recentAnnouncements = announcementsData.slice(0, 3);
  const upcomingAssignments = assignmentsData.slice(0, 3);

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="font-mono text-3xl font-bold text-[#3E2C23] mb-6">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Calendar, label: "Today's Classes", value: stats.todayClasses },
            { icon: BookOpen, label: 'Pending Assignments', value: stats.pendingAssignments },
            { icon: CheckCircle, label: 'Attendance %', value: `${stats.attendancePercentage}%` },
            { icon: TrendingUp, label: 'Current GPA', value: stats.gpa.toFixed(2) },
          ].map((stat, idx) => (
            <div key={idx} className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-4 hover:border-t-4 hover:border-t-[#A67B5B] transition-all">
              <div className="flex items-center gap-3 mb-2">
                <stat.icon size={20} className="text-[#6F4E37]" />
                <span className="font-mono text-xs tracking-widest uppercase text-[#6F4E37]">
                  {stat.label}
                </span>
              </div>
              <div className="font-mono text-2xl font-bold text-[#3E2C23]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Announcements */}
        <div className="mb-8">
          <h2 className="font-mono text-xl font-bold text-[#3E2C23] mb-4">Recent Announcements</h2>
          <div className="space-y-2">
            {recentAnnouncements.map((ann) => (
              <div key={ann.id} className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-4 hover:bg-[#E6D8C3] transition-colors">
                <h3 className="font-mono font-bold text-[#3E2C23]">{ann.title}</h3>
                <p className="text-[#3E2C23] text-sm mt-1 line-clamp-2">{ann.body}</p>
                <div className="font-mono text-xs text-[#6F4E37] mt-2">
                  Posted by {ann.postedBy} · {new Date(ann.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div>
          <h2 className="font-mono text-xl font-bold text-[#3E2C23] mb-4">Upcoming Assignments</h2>
          <div className="space-y-2">
            {upcomingAssignments.map((asg) => (
              <div key={asg.id} className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-4 hover:bg-[#E6D8C3] transition-colors">
                <h3 className="font-mono font-bold text-[#3E2C23]">{asg.title}</h3>
                <div className="flex justify-between mt-2">
                  <span className="font-mono text-xs text-[#6F4E37]">{asg.subject}</span>
                  <span className="font-mono text-xs text-[#A67B5B]">
                    Due: {new Date(asg.dueDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
