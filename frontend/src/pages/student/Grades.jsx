import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { gradesData } from '../../mock/grades';

export const StudentGrades = () => {
  const [grades, setGrades] = useState(gradesData);
  const groupedBySubject = grades.reduce((acc, g) => {
    if (!acc[g.subject]) acc[g.subject] = [];
    acc[g.subject].push(g);
    return acc;
  }, {});

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-syne text-3xl font-bold text-[#3E2C23] mb-6">Grades</h1>

        {Object.entries(groupedBySubject).map(([subject, gradesList]) => (
          <div key={subject} className="mb-8">
            <h2 className="font-syne text-lg font-bold text-[#3E2C23] mb-3 border-b border-[#D2B48C]/40 pb-2">
              {subject}
            </h2>

            {gradesList.map((g) => (
              <div key={`${g.studentId}-${g.subject}`}>
                <div className="overflow-x-auto border border-[#D2B48C]/40 mb-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#D2B48C]/40 bg-[#E6D8C3]">
                        {['Assignment', 'Score', 'Max', 'Percentage'].map((h) => (
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
                      {g.assignments.map((a, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-[#D2B48C]/40 hover:bg-[#E6D8C3] hover:border-l-4 hover:border-l-[#A67B5B] transition-all"
                        >
                          <td className="px-4 py-3 text-[#3E2C23] text-sm">{a.name}</td>
                          <td className="px-4 py-3 text-[#3E2C23] text-sm">{a.score}</td>
                          <td className="px-4 py-3 text-[#3E2C23] text-sm">{a.maxScore}</td>
                          <td className="px-4 py-3 text-[#A67B5B] font-mono text-sm">
                            {((a.score / a.maxScore) * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end mb-6">
                  <div className="text-center">
                    <p className="font-mono text-xs text-[#6F4E37] tracking-widest uppercase mb-1">
                      Final Grade
                    </p>
                    <p className="font-syne text-2xl font-bold text-[#A67B5B]">{g.finalGrade}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};
