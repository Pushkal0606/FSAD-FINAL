import React from 'react';

export const Table = ({ columns, data, onRowClick, actions }) => {
  return (
    <div className="w-full overflow-x-auto border border-[#D2B48C]/40">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#D2B48C]/40 bg-[#E6D8C3]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-[#3E2C23]"
              >
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-[#3E2C23]">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick && onRowClick(row)}
              className="border-b border-[#D2B48C]/40 hover:bg-[#E6D8C3] hover:border-l-4 hover:border-l-[#A67B5B] transition-all"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-[#3E2C23] text-sm">
                  {col.render ? col.render(row[col.key], row) : row[col.key] || '-'}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-3 flex gap-2">
                  {actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick(row);
                      }}
                      className="text-[#A67B5B] hover:text-[#3E2C23] text-sm font-mono transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
