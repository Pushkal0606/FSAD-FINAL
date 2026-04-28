import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Upload, FileText, CheckCircle, Clock, AlertCircle, Download } from 'lucide-react';

export const StudentAssignments = () => {
 const { user } = useAuth();
 const [assignments, setAssignments] = useState([]);
 const [submissions, setSubmissions] = useState([]);
 const [loading, setLoading] = useState(false);
 const [modalOpen, setModalOpen] = useState(false);
 const [selectedAssignment, setSelectedAssignment] = useState(null);
 const [uploading, setUploading] = useState(false);
 const [file, setFile] = useState(null);
 const [error, setError] = useState('');

 useEffect(() => {
 fetchData();
 }, []);

 const fetchData = async () => {
 try {
 setLoading(true);
 const [asgRes, subRes] = await Promise.all([
 api.get('/api/assignments'),
 api.get(`/api/submissions/student/${user.id}`)
 ]);
 setAssignments(asgRes.data);
 setSubmissions(subRes.data);
 } catch (err) {
 setError('Failed to load academic data.');
 } finally {
 setLoading(false);
 }
 };

 const handleFileUpload = async (e) => {
 const selectedFile = e.target.files[0];
 if (!selectedFile) return;

 setUploading(true);
 const formData = new FormData();
 formData.append('file', selectedFile);

 try {
 const response = await api.post('/api/files/upload', formData, {
 headers: { 'Content-Type': 'multipart/form-data' }
 });
 setFile(response.data.fileDownloadUri);
 } catch (err) {
 setError('File upload failed. Please try again.');
 } finally {
 setUploading(false);
 }
 };

 const handleSubmit = async () => {
 if (!file) {
 setError('Please upload a file before submitting.');
 return;
 }

 try {
 setLoading(true);
 await api.post('/api/submissions', {
 assignmentId: selectedAssignment.id,
 studentId: user.id,
 fileUrl: file
 });
 fetchData();
 closeModal();
 } catch (err) {
 setError(err.message || 'Submission failed.');
 } finally {
 setLoading(false);
 }
 };

 const closeModal = () => {
 setModalOpen(false);
 setSelectedAssignment(null);
 setFile(null);
 setError('');
 };

 const getSubmissionStatus = (assignmentId) => {
 return submissions.find(s => s.assignmentId === assignmentId);
 };

 return (
 <DashboardLayout>
 <div className="max-w-6xl mx-auto py-8 px-4">
 <div className="mb-10">
 <h1 className="font-mono text-4xl font-bold text-white mb-2">My Assignments</h1>
 <p className="text-gray-400 font-mono text-sm">View and submit your academic requirements.</p>
 </div>

 {error && (
 <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-mono text-sm">
 {error}
 </div>
 )}

 <div className="space-y-4">
 {loading && assignments.length === 0 ? (
 <div className="animate-pulse space-y-4">
 {[1, 2, 3].map(i => <div key={i} className="h-20 bg-[#111] border-[#333] focus:border-[#a855f7] border border-[#333]"></div>)}
 </div>
 ) : assignments.map((asg) => {
 const submission = getSubmissionStatus(asg.id);
 const isDue = new Date(asg.dueDate) < new Date();
 
 return (
 <div key={asg.id} className="bg-black border border-[#333] border border-[#333] p-5 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover: transition-all">
 <div className="flex items-center gap-4">
 <div className={`p-3 rounded-sm ${submission ? 'bg-green-950 text-green-600' : 'bg-[#111] text-[#a855f7]'}`}>
 <FileText size={24} />
 </div>
 <div>
 <h3 className="font-mono text-lg font-bold text-white">{asg.title}</h3>
 <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
 <span className="text-xs font-mono text-[#a855f7] flex items-center gap-1">
 <Clock size={12} />
 Due: {new Date(asg.dueDate).toLocaleString()}
 </span>
 {submission && (
 <span className="text-xs font-mono text-green-600 flex items-center gap-1">
 <CheckCircle size={12} />
 Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
 </span>
 )}
 </div>
 </div>
 </div>

 <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
 <div className="flex flex-col items-end">
 {submission ? (
 <div className="flex flex-col items-end gap-1">
 <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase ${submission.status === 'GRADED' ? 'bg-green-600 text-white' : 'bg-[#a855f7] text-white'}`}>
 {submission.status || 'SUBMITTED'}
 </span>
 {submission.grade !== null && (
 <span className="text-sm font-bold text-white">Grade: {submission.grade}/100</span>
 )}
 </div>
 ) : (
 <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase ${isDue ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
 {isDue ? 'OVERDUE' : 'PENDING'}
 </span>
 )}
 </div>

 <button
 onClick={() => {
 setSelectedAssignment(asg);
 setModalOpen(true);
 }}
 className={`px-6 py-2 rounded-sm font-mono text-xs font-bold tracking-widest uppercase transition-all ${
 submission ? 'border border-[#333] text-white hover:bg-[#111]' : 'bg-[#a855f7] text-white hover:bg-purple-700'
 }`}
 >
 {submission ? 'View' : 'Submit'}
 </button>
 </div>
 </div>
 );
 })}
 </div>
 </div>

 {selectedAssignment && (
 <Modal
 isOpen={modalOpen}
 onClose={closeModal}
 title={selectedAssignment.title}
 footerActions={
 <div className="flex gap-3">
 <button
 onClick={closeModal}
 className="px-6 py-2 border border-[#333] text-white font-mono text-sm hover:bg-[#111] transition-colors"
 >
 Close
 </button>
 {!getSubmissionStatus(selectedAssignment.id) && (
 <button
 onClick={handleSubmit}
 disabled={loading || uploading || !file}
 className="px-6 py-2 bg-[#a855f7] text-white font-mono text-sm hover:bg-purple-700 transition-colors disabled:opacity-50"
 >
 {loading ? 'Submitting...' : 'Confirm Submission'}
 </button>
 )}
 </div>
 }
 >
 <div className="space-y-6 py-4">
 <div className="bg-black p-4 border-l-4 border-[#a855f7]">
 <p className="text-white text-sm leading-relaxed">{selectedAssignment.description}</p>
 {selectedAssignment.fileUrl && (
 <a 
 href={selectedAssignment.fileUrl} 
 target="_blank" 
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 mt-3 text-[#a855f7] hover:underline font-mono text-xs font-bold"
 >
 <Download size={14} />
 Download Resource
 </a>
 )}
 </div>

 {getSubmissionStatus(selectedAssignment.id) ? (
 <div className="space-y-4">
 <div className="p-4 bg-green-50 border border-green-200 rounded-sm">
 <h4 className="font-mono text-xs font-bold text-green-700 uppercase tracking-widest mb-2">Your Submission</h4>
 <div className="flex items-center gap-2 text-white">
 <FileText size={16} />
 <a href={getSubmissionStatus(selectedAssignment.id).fileUrl} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline truncate">
 View Submitted File
 </a>
 </div>
 </div>
 
 {getSubmissionStatus(selectedAssignment.id).feedback && (
 <div className="p-4 bg-blue-50 border border-blue-200 rounded-sm">
 <h4 className="font-mono text-xs font-bold text-blue-700 uppercase tracking-widest mb-2">Instructor Feedback</h4>
 <p className="text-white text-sm italic">"{getSubmissionStatus(selectedAssignment.id).feedback}"</p>
 </div>
 )}
 </div>
 ) : (
 <div>
 <label className="block font-mono text-xs tracking-widest uppercase text-gray-400 mb-3 font-bold">
 Upload Your Work *
 </label>
 <div className={`relative border-2 border-dashed rounded-sm p-10 text-center transition-all ${
 file ? 'border-green-500 bg-green-50' : 'border-[#333] hover:border-[#a855f7] bg-black'
 }`}>
 <input
 type="file"
 onChange={handleFileUpload}
 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
 disabled={uploading}
 />
 {uploading ? (
 <div className="flex flex-col items-center">
 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#a855f7] mb-2"></div>
 <p className="text-[#a855f7] font-mono text-xs">Uploading file...</p>
 </div>
 ) : file ? (
 <div className="flex flex-col items-center">
 <CheckCircle size={32} className="text-green-500 mb-2" />
 <p className="text-green-700 font-mono text-xs font-bold">File uploaded successfully!</p>
 <p className="text-gray-500 text-[10px] mt-1 truncate max-w-xs">{file}</p>
 </div>
 ) : (
 <div className="flex flex-col items-center">
 <Upload size={32} className="text-[#D2B48C] mb-2" />
 <p className="text-gray-400 font-mono text-xs">Click to browse or drag & drop</p>
 <p className="text-[#D2B48C] text-[10px] mt-2 font-mono uppercase tracking-widest">PDF, DOCX, ZIP (MAX 10MB)</p>
 </div>
 )}
 </div>
 </div>
 )}
 </div>
 </Modal>
 )}
 </DashboardLayout>
 );
};
