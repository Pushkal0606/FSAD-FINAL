import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import api from '../../services/api';
import { FileText, Download, CheckCircle, Clock, Save, User as UserIcon, ArrowLeft } from 'lucide-react';

export const Submissions = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const queryParams = new URLSearchParams(location.search);
 const assignmentId = queryParams.get('assignmentId');
 
 const [submissions, setSubmissions] = useState([]);
 const [assignment, setAssignment] = useState(null);
 const [loading, setLoading] = useState(false);
 const [grading, setGrading] = useState(false);
 const [error, setError] = useState('');
 const [selectedSubmission, setSelectedSubmission] = useState(null);
 const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });

 const [allAssignments, setAllAssignments] = useState([]);

 useEffect(() => {
 if (assignmentId) {
 fetchSubmissions();
 } else {
 fetchAllAssignments();
 }
 }, [assignmentId]);

 const fetchAllAssignments = async () => {
 try {
 setLoading(true);
 const response = await api.get('/api/assignments');
 setAllAssignments(response.data);
 } catch (err) {
 setError('Failed to load assignments.');
 } finally {
 setLoading(false);
 }
 };

 const fetchSubmissions = async () => {
 try {
 setLoading(true);
 const [asgRes, subRes] = await Promise.all([
 api.get(`/api/assignments/${assignmentId}`),
 api.get(`/api/assignments/${assignmentId}/submissions`)
 ]);
 setAssignment(asgRes.data);
 setSubmissions(subRes.data);
 } catch (err) {
 setError('Failed to load submissions.');
 } finally {
 setLoading(false);
 }
 };

 const handleGradeSubmit = async () => {
 if (!gradeData.grade || isNaN(gradeData.grade)) {
 setError('Please enter a valid numeric grade.');
 return;
 }

 try {
 setGrading(true);
 await api.put(`/api/submissions/${selectedSubmission.id}/grade`, {
 grade: parseFloat(gradeData.grade),
 feedback: gradeData.feedback
 });
 fetchSubmissions();
 setSelectedSubmission(null);
 setGradeData({ grade: '', feedback: '' });
 setError('');
 } catch (err) {
 setError(err.message || 'Failed to update grade.');
 } finally {
 setGrading(false);
 }
 };

 return (
 <DashboardLayout>
 <div className="max-w-6xl mx-auto py-8 px-4">
 <div className="flex items-center gap-4 mb-8">
 <button 
 onClick={() => navigate('/teacher/create-assignment')}
 className="p-2 hover:bg-[#111] rounded-full transition-colors text-[#a855f7]"
 >
 <ArrowLeft size={24} />
 </button>
 <div>
 <h1 className="font-mono text-3xl font-bold text-white">
 {assignment ? `Submissions: ${assignment.title}` : 'Submissions'}
 </h1>
 <p className="text-gray-400 font-mono text-sm tracking-tight">Review and grade student work.</p>
 </div>
 </div>

 {error && (
 <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-mono text-sm">
 {error}
 </div>
 )}

 {!assignmentId ? (
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {allAssignments.map((asg) => (
 <div 
 key={asg.id} 
 onClick={() => navigate(`/teacher/submissions?assignmentId=${asg.id}`)}
 className="bg-black border border-[#333] border border-[#333] p-6 rounded-sm hover: transition-all cursor-pointer group"
 >
 <h3 className="font-mono text-xl font-bold text-white mb-4 group-hover:text-[#a855f7] transition-colors">{asg.title}</h3>
 <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-4">
 <Clock size={12} />
 Due: {new Date(asg.dueDate).toLocaleDateString()}
 </div>
 <div className="text-[#a855f7] font-mono text-[10px] font-bold tracking-widest uppercase">
 Select to view submissions →
 </div>
 </div>
 ))}
 </div>
 ) : (
 <div className="bg-black border border-[#333] border border-[#333] rounded-sm overflow-hidden ">
 <table className="w-full">
 <thead>
 <tr className="bg-[#111] border-b border-[#333]">
 <th className="px-6 py-4 text-left font-mono text-xs tracking-widest uppercase text-white">Student</th>
 <th className="px-6 py-4 text-left font-mono text-xs tracking-widest uppercase text-white">Submitted Date</th>
 <th className="px-6 py-4 text-left font-mono text-xs tracking-widest uppercase text-white">Status</th>
 <th className="px-6 py-4 text-left font-mono text-xs tracking-widest uppercase text-white">Grade</th>
 <th className="px-6 py-4 text-right font-mono text-xs tracking-widest uppercase text-white">Action</th>
 </tr>
 </thead>
 <tbody>
 {loading ? (
 <tr>
 <td colSpan="5" className="py-20 text-center">
 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#a855f7] mx-auto"></div>
 </td>
 </tr>
 ) : submissions.length === 0 ? (
 <tr>
 <td colSpan="5" className="py-20 text-center">
 <p className="font-mono text-gray-400">No submissions received yet.</p>
 </td>
 </tr>
 ) : (
 submissions.map((sub) => (
 <tr key={sub.id} className="border-b border-[#333] hover:bg-black transition-all group">
 <td className="px-6 py-4">
 <div className="flex items-center gap-3">
 <div className="w-8 h-8 bg-[#111] flex items-center justify-center rounded-sm text-[#a855f7] font-bold text-xs">
 {sub.studentName?.charAt(0) || <UserIcon size={14} />}
 </div>
 <span className="text-white font-bold text-sm">{sub.studentName || 'Unknown Student'}</span>
 </div>
 </td>
 <td className="px-6 py-4">
 <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
 <Clock size={12} />
 {new Date(sub.submittedAt).toLocaleString()}
 </div>
 </td>
 <td className="px-6 py-4">
 <span className={`px-2 py-1 rounded-sm text-[10px] font-mono font-bold tracking-widest uppercase ${
 sub.status === 'GRADED' ? 'bg-green-950 text-green-700' : 'bg-[#111] text-blue-700'
 }`}>
 {sub.status || 'SUBMITTED'}
 </span>
 </td>
 <td className="px-6 py-4 font-mono text-sm text-white">
 {sub.grade !== null ? `${sub.grade}/100` : '-'}
 </td>
 <td className="px-6 py-4 text-right">
 <button
 onClick={() => {
 setSelectedSubmission(sub);
 setGradeData({ grade: sub.grade || '', feedback: sub.feedback || '' });
 }}
 className="px-4 py-2 border border-[#a855f7] text-[#a855f7] font-mono text-[10px] font-bold tracking-widest uppercase hover:bg-[#a855f7] hover:text-white transition-all rounded-sm"
 >
 {sub.status === 'GRADED' ? 'Update Grade' : 'Grade Now'}
 </button>
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>
 </div>
 )}
 </div>

 {selectedSubmission && (
 <Modal
 isOpen={true}
 onClose={() => setSelectedSubmission(null)}
 title={`Grading: ${selectedSubmission.studentName}`}
 footerActions={
 <div className="flex gap-3">
 <button
 onClick={() => setSelectedSubmission(null)}
 className="px-6 py-2 border border-[#333] text-white font-mono text-sm hover:bg-[#111] transition-colors"
 >
 Cancel
 </button>
 <button
 onClick={handleGradeSubmit}
 disabled={grading}
 className="flex items-center gap-2 px-6 py-2 bg-[#a855f7] text-white font-mono text-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
 >
 <Save size={16} />
 {grading ? 'Saving...' : 'Save Grade'}
 </button>
 </div>
 }
 >
 <div className="space-y-6 py-4">
 <div className="p-4 bg-black rounded-sm border border-[#333]">
 <h4 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Submitted Document</h4>
 <div className="flex items-center justify-between bg-black border border-[#333] p-3 border border-[#333] rounded-sm">
 <div className="flex items-center gap-3 overflow-hidden">
 <FileText size={20} className="text-[#a855f7]" />
 <span className="text-sm text-white truncate">{selectedSubmission.fileUrl}</span>
 </div>
 <a 
 href={selectedSubmission.fileUrl} 
 target="_blank" 
 rel="noopener noreferrer"
 className="flex items-center gap-1 text-[#a855f7] hover:text-gray-400 transition-colors font-mono text-[10px] font-bold uppercase"
 >
 <Download size={14} />
 Download
 </a>
 </div>
 </div>

 <div className="grid grid-cols-1 gap-5">
 <div>
 <label className="block font-mono text-xs tracking-widest uppercase text-gray-400 mb-2 font-bold">
 Score (Out of 100) *
 </label>
 <input
 type="number"
 min="0"
 max="100"
 value={gradeData.grade}
 onChange={(e) => setGradeData({ ...gradeData, grade: e.target.value })}
 className="w-full md:w-32 bg-black border border-[#333] px-4 py-3 text-white font-mono text-sm focus:border-[#a855f7] focus:outline-none transition-all rounded-sm shadow-inner"
 placeholder="0.0"
 required
 />
 </div>

 <div>
 <label className="block font-mono text-xs tracking-widest uppercase text-gray-400 mb-2 font-bold">
 Instructor Feedback
 </label>
 <textarea
 value={gradeData.feedback}
 onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
 className="w-full bg-black border border-[#333] px-4 py-3 text-white font-mono text-sm focus:border-[#a855f7] focus:outline-none transition-all rounded-sm shadow-inner"
 rows="4"
 placeholder="Well done, but pay attention to..."
 />
 </div>
 </div>
 </div>
 </Modal>
 )}
 </DashboardLayout>
 );
};
