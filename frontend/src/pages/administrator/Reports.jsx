import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { studentsData } from '../../mock/students';

export const Reports = () => {
  const [reportType, setReportType] = useState('attendance');
  const [fromDate, setFromDate] = useState('2025-02-01');
  const [toDate, setToDate] = useState('2025-02-22');
  const [selectedClass, setSelectedClass] = useState('101');
  const [results, setResults] = useState(null);

  const handleGenerate = () => {
    const mockResults = {
      attendance: [
        { student: 'Aarav Kumar', present: 18, absent: 2, late: 1 },
        { student: 'Bhavna Singh', present: 19, absent: 1, late: 1 },
        { student: 'Sofia Rodriguez', present: 17, absent: 2, late: 2 },
      ],
      grades: [
        { student: 'Aarav Kumar', subject: 'Data Structures', grade: 'A', percentage: 88 },
        { student: 'Bhavna Singh', subject: 'Data Structures', grade: 'A+', percentage: 94 },
        { student: 'Sofia Rodriguez', subject: 'Data Structures', grade: 'B+', percentage: 82 },
      ],
      enrollment: [
        { department: 'CS', total: 25, male: 15, female: 10 },
        { department: 'EC', total: 18, male: 11, female: 7 },
        { department: 'ME', total: 22, male: 12, female: 10 },
      ],
    };
    setResults(mockResults[reportType]);
  };

  const handleExportCSV = () => {
    if (!results) return;
    const headers = Object.keys(results[0]);
    const csv = [
      headers.join(','),
      ...results.map((row) => headers.map((h) => row[h]).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-${reportType}.csv`;
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-syne text-3xl font-bold text-[#3E2C23] mb-6">Reports</h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#D2B48C]/40 p-4">
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => {
                setReportType(e.target.value);
                setResults(null);
              }}
              className="w-full bg-[#E6D8C3] border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            >
              {['attendance', 'grades', 'enrollment'].map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              From Date
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full bg-[#E6D8C3] border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
              To Date
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full bg-[#E6D8C3] border border-[#555] px-3 py-2 text-[#3E2C23] focus:border-[#A67B5B] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleGenerate}
              className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-white text-[#3E2C23] font-mono text-sm px-4 py-2 hover:bg-accent hover:text-black hover:border-[#A67B5B] transition-all"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Results */}
        {results && (
          <>
            <div className="mb-4">
              <button
                onClick={handleExportCSV}
                className="bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-white text-[#3E2C23] font-mono text-sm px-6 py-2 hover:bg-accent hover:text-black hover:border-[#A67B5B] transition-all"
              >
                Export CSV
              </button>
            </div>
            <div className="overflow-x-auto border border-[#D2B48C]/40">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#D2B48C]/40 bg-[#E6D8C3]">
                    {Object.keys(results[0]).map((key) => (
                      <th
                        key={key}
                        className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-[#3E2C23]"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-[#D2B48C]/40 hover:bg-[#E6D8C3] hover:border-l-4 hover:border-l-[#A67B5B] transition-all"
                    >
                      {Object.values(row).map((val, idx) => (
                        <td key={idx} className="px-4 py-3 text-[#3E2C23] text-sm">
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};
