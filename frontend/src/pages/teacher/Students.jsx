import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import api from '../../services/api';
import { User, Mail, Book, Hash, Search, Loader } from 'lucide-react';

export const TeacherStudents = () => {
 const [students, setStudents] = useState([]);
 const [loading, setLoading] = useState(false);
 const [search, setSearch] = useState('');
 const [selectedStudent, setSelectedStudent] = useState(null);
 const [modalOpen, setModalOpen] = useState(false);
 const [error, setError] = useState('');

 useEffect(() => {
 fetchStudents();
 }, []);

 const fetchStudents = async () => {
 try {
 setLoading(true);
 const response = await api.get('/api/students');
 setStudents(response.data);
 } catch (err) {
 setError('Failed to fetch students.');
 } finally {
 setLoading(false);
 }
 };

 const filtered = students.filter((s) =>
 s.name.toLowerCase().includes(search.toLowerCase()) ||
 s.email.toLowerCase().includes(search.toLowerCase())
 );

 return (
 <DashboardLayout>
 <div className="max-w-5xl">
 <h1 className="font-mono text-3xl font-bold text-white mb-6">Students</h1>

 <div className="mb-6">
 <input
 type="text"
 value={search}
 onChange={(e) => setSearch(e.target.value)}
 placeholder="Search students..."
 className="w-full bg-black rounded-sm border border-[#555] px-4 py-2 text-white focus:border-[#a855f7] focus:outline-none transition-colors"
 />
 </div>

 <div className="overflow-x-auto border border-[#333]">
 <table className="w-full">
 <thead>
 <tr className="border-b border-[#333] bg-[#111]">
 {['Name', 'Role', 'Status', 'Email', 'Action'].map((h) => (
 <th
 key={h}
 className="px-4 py-3 text-left font-mono text-xs tracking-widest uppercase text-white"
 >
 {h}
 </th>
 ))}
 </tr>
 </thead>
 <tbody>
 {loading ? (
 <tr>
 <td colSpan="5" className="py-20 text-center">
 <Loader className="animate-spin h-8 w-8 text-[#a855f7] mx-auto" />
 </td>
 </tr>
 ) : filtered.length === 0 ? (
 <tr>
 <td colSpan="5" className="py-20 text-center text-gray-400 font-mono">No students found.</td>
 </tr>
 ) : filtered.map((student) => (
 <tr
 key={student.id}
 className="border-b border-[#333] hover:bg-[#111] hover:border-l-4 hover:border-l-[#a855f7] transition-all"
 >
 <td className="px-4 py-3 text-white text-sm font-bold">{student.name}</td>
 <td className="px-4 py-3 text-white text-xs font-mono">{student.role}</td>
 <td className="px-4 py-3">
 <span className={`px-2 py-1 rounded-sm text-[10px] font-mono font-bold tracking-widest uppercase ${
 student.status === 'ACTIVE' ? 'bg-green-950 text-green-700' : 'bg-red-100 text-red-700'
 }`}>
 {student.status || 'ACTIVE'}
 </span>
 </td>
 <td className="px-4 py-3 text-gray-400 text-sm">{student.email}</td>
 <td className="px-4 py-3">
 <button
 onClick={() => {
 setSelectedStudent(student);
 setModalOpen(true);
 }}
 className="text-[#a855f7] hover:text-white font-mono text-xs transition-colors font-bold uppercase tracking-widest"
 >
 View
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 {selectedStudent && (
 <Modal
 isOpen={modalOpen}
 onClose={() => setModalOpen(false)}
 title={selectedStudent.name}
 footerActions={
 <button
 onClick={() => setModalOpen(false)}
 className="px-4 py-2 border border-[#333] text-white hover:border-[#a855f7] transition-colors"
 >
 Close
 </button>
 }
 >
 <div className="space-y-4">
 <div className="flex items-center gap-4 mb-4">
 <div className="w-20 h-20 bg-[#111] border-2 border-[#a855f7] flex items-center justify-center font-mono text-xl font-bold text-[#a855f7]">
 {selectedStudent.avatar}
 </div>
 <div>
 <h3 className="font-mono font-bold text-white text-lg">
 {selectedStudent.name}
 </h3>
 <p className="text-[#a855f7] font-mono text-xs">{selectedStudent.enrollmentId}</p>
 </div>
 </div>

 {[
 { label: 'Email', value: selectedStudent.email },
 { label: 'Department', value: selectedStudent.department },
 { label: 'Class', value: selectedStudent.classId },
 { label: 'Enrollment ID', value: selectedStudent.enrollmentId },
 ].map((field) => (
 <div key={field.label}>
 <p className="font-mono text-xs text-gray-400 tracking-widest uppercase mb-1">
 {field.label}
 </p>
 <p className="text-white">{field.value}</p>
 </div>
 ))}
 </div>
 </Modal>
 )}
 </DashboardLayout>
 );
};
