import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { auditLogsData } from '../../mock/auditLogs';

export const AuditLogs = () => {
  const [filter, setFilter] = React.useState('all');
  const [logs, setLogs] = React.useState(auditLogsData);

  const filtered = logs.filter((log) => {
    if (filter === 'all') return true;
    return log.action.startsWith(filter);
  });

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-mono text-3xl font-bold text-[#3E2C23] mb-6">Audit Logs</h1>

        <div className="mb-6 flex gap-2">
          {['all', 'LOGIN', 'CREATE', 'UPDATE', 'DELETE'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-mono text-xs tracking-widest uppercase px-3 py-2 border transition-colors ${
                filter === f
                  ? 'border-[#A67B5B] text-[#A67B5B] bg-[#E6D8C3]'
                  : 'border-[#D2B48C]/40 text-[#6F4E37] hover:border-[#A67B5B]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto border border-[#D2B48C]/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D2B48C]/40 bg-[#E6D8C3]">
                {['Timestamp', 'User', 'Role', 'Action', 'Entity'].map((h) => (
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
              {filtered.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-[#D2B48C]/40 hover:bg-[#E6D8C3] hover:border-l-4 hover:border-l-[#A67B5B] transition-all"
                >
                  <td className="px-4 py-3 text-[#3E2C23] text-sm font-mono">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-[#3E2C23] text-sm">{log.user}</td>
                  <td className="px-4 py-3 text-[#A67B5B] font-mono text-xs uppercase">{log.role}</td>
                  <td className="px-4 py-3 text-[#3E2C23] text-sm">{log.action}</td>
                  <td className="px-4 py-3 text-[#3E2C23] text-sm">{log.entity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};
