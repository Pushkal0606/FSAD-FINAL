import React, { useState } from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Modal } from '../../components/Modal';
import { assignmentsData } from '../../mock/assignments';
import { Upload } from 'lucide-react';

export const StudentAssignments = () => {
  const [assignments, setAssignments] = useState(assignmentsData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submitted, setSubmitted] = useState({});

  const handleSubmit = (id) => {
    setSubmitted((prev) => ({ ...prev, [id]: true }));
    setModalOpen(false);
    setTimeout(() => setSubmitted((prev) => ({ ...prev, [id]: false })), 3000);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAssignment(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <h1 className="font-syne text-3xl font-bold text-[#3E2C23] mb-6">Assignments</h1>

        <div className="overflow-x-auto border border-[#D2B48C]/40">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#D2B48C]/40 bg-[#E6D8C3]">
                {['Subject', 'Title', 'Due Date', 'Status', 'Action'].map((h) => (
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
              {assignments.map((asg) => (
                <tr
                  key={asg.id}
                  className="border-b border-[#D2B48C]/40 hover:bg-[#E6D8C3] hover:border-l-4 hover:border-l-[#A67B5B] transition-all"
                >
                  <td className="px-4 py-3 text-[#3E2C23] text-sm">{asg.subject}</td>
                  <td className="px-4 py-3 text-[#3E2C23] text-sm">{asg.title}</td>
                  <td className="px-4 py-3 text-[#3E2C23] text-sm">
                    {new Date(asg.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-mono text-xs px-2 py-1 border ${
                        submitted[asg.id]
                          ? 'border-[#A67B5B] text-[#A67B5B]'
                          : 'border-white text-[#3E2C23]'
                      }`}
                    >
                      {submitted[asg.id] ? 'SUBMITTED' : 'PENDING'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {!submitted[asg.id] && (
                      <button
                        onClick={() => {
                          setSelectedAssignment(asg);
                          setModalOpen(true);
                        }}
                        className="text-[#A67B5B] hover:text-[#3E2C23] font-mono text-xs transition-colors"
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedAssignment && (
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          title={selectedAssignment.title}
          footerActions={
            <>
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-[#D2B48C]/40 text-[#3E2C23] hover:border-[#A67B5B] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(selectedAssignment.id)}
                className="px-4 py-2 bg-accent text-black hover:bg-white transition-colors font-mono text-sm"
              >
                Submit
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
                Upload File
              </label>
              <div className="border-2 border-dashed border-[#D2B48C]/40 p-6 text-center hover:border-[#A67B5B] transition-colors">
                <Upload size={24} className="mx-auto text-[#6F4E37] mb-2" />
                <p className="text-[#6F4E37] font-mono text-xs">Click to upload or drag and drop</p>
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs tracking-widest uppercase text-[#3E2C23] mb-2">
                Comments (Optional)
              </label>
              <textarea
                className="w-full bg-[#EDE3D2]/80 backdrop-blur-md rounded-sm border border-[#555] px-3 py-2 text-[#3E2C23] font-mono text-sm focus:border-[#A67B5B] focus:outline-none transition-colors"
                rows="3"
                placeholder="Add any comments..."
              />
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
};
