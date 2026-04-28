import React from 'react';

export const Table = ({ columns, data, onRowClick, actions }) => {
 return (
 <div className="w-full overflow-x-auto border border-[#333]">
 <table className="w-full">
 <thead>
 <tr className="border-b border-[#333] bg-[#111]">
 {columns.map((col) => (
 <th
 key={col.key}
 className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-white"
 >
 {col.label}
 </th>
 ))}
 {actions && <th className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-white">Actions</th>}
 </tr>
 </thead>
 <tbody>
 {data.map((row, idx) => (
 <tr
 key={idx}
 onClick={() => onRowClick && onRowClick(row)}
 className="border-b border-[#333] hover:bg-[#111] hover:border-l-4 hover:border-l-[#a855f7] transition-all"
 >
 {columns.map((col) => (
 <td key={col.key} className="px-4 py-3 text-white text-sm">
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
 className="text-[#a855f7] hover:text-white text-sm font-mono transition-colors"
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
