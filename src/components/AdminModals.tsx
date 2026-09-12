import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ComplaintStatus } from '../types';
import { MUNICIPAL_OFFICERS } from '../data/mockData';
import { X, UserCheck, RefreshCw } from 'lucide-react';

export const AssignOfficerModal: React.FC = () => {
  const { 
    assignModalComplaint, 
    closeAssignOfficerModal, 
    assignComplaint 
  } = useApp();

  const [selectedOfficer, setSelectedOfficer] = useState(
    MUNICIPAL_OFFICERS[0].name + ' (' + MUNICIPAL_OFFICERS[0].department + ')'
  );
  const [remarks, setRemarks] = useState(
    'Assigned to Ward field team for immediate on-site inspection and remedial action.'
  );

  useEffect(() => {
    if (assignModalComplaint?.assignedOfficer) {
      const match = MUNICIPAL_OFFICERS.find(o => o.name === assignModalComplaint.assignedOfficer);
      if (match) {
        setSelectedOfficer(`${match.name} (${match.department})`);
      }
    }
  }, [assignModalComplaint]);

  if (!assignModalComplaint) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    assignComplaint(assignModalComplaint.id, selectedOfficer, remarks);
    closeAssignOfficerModal();
  };

  return (
    <div 
      id="assign-officer-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={closeAssignOfficerModal}
    >
      <div 
        id="assign-officer-modal"
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-emerald-800 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-emerald-300" />
            <h3 className="font-bold text-sm">Assign Municipal Officer</h3>
          </div>
          <button 
            id="close-assign-modal-btn"
            onClick={closeAssignOfficerModal} 
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <p className="font-bold text-slate-800">{assignModalComplaint.id}: {assignModalComplaint.title}</p>
            <p className="text-slate-500 mt-1">{assignModalComplaint.category} • {assignModalComplaint.location}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Officer / Department
            </label>
            <select
              id="assign-officer-select"
              value={selectedOfficer}
              onChange={e => setSelectedOfficer(e.target.value)}
              className="w-full text-sm p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            >
              {MUNICIPAL_OFFICERS.map(officer => (
                <option key={officer.id} value={`${officer.name} (${officer.department})`}>
                  {officer.name} – {officer.department}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Assignment Instructions / Notes
            </label>
            <textarea
              id="assign-officer-notes"
              rows={3}
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              placeholder="Enter special orders, priority notes, or vehicle dispatch info..."
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              id="cancel-assign-btn"
              onClick={closeAssignOfficerModal}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="confirm-assign-btn"
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Confirm Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UpdateStatusModal: React.FC = () => {
  const { 
    statusModalComplaint, 
    closeUpdateStatusModal, 
    updateComplaintStatus 
  } = useApp();

  const [newStatus, setNewStatus] = useState<ComplaintStatus>('In Progress');
  const [remarks, setRemarks] = useState('Field team dispatched for inspection and remedial action.');

  useEffect(() => {
    if (statusModalComplaint) {
      setNewStatus(statusModalComplaint.status);
      setRemarks(
        statusModalComplaint.status === 'Submitted'
          ? 'Complaint verified on-site by municipal control desk.'
          : statusModalComplaint.status === 'Assigned'
          ? 'Field work mobilized. Repair crew active on site.'
          : 'Grievance redressed and resolved on site with photo proof.'
      );
    }
  }, [statusModalComplaint]);

  if (!statusModalComplaint) return null;

  const statuses: ComplaintStatus[] = [
    'Submitted',
    'Under Verification',
    'Assigned',
    'In Progress',
    'Resolved'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateComplaintStatus(statusModalComplaint.id, newStatus, remarks);
    closeUpdateStatusModal();
  };

  return (
    <div 
      id="update-status-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={closeUpdateStatusModal}
    >
      <div 
        id="update-status-modal"
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        <div className="bg-emerald-800 text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-emerald-300" />
            <h3 className="font-bold text-sm">Update Complaint Status</h3>
          </div>
          <button 
            id="close-status-modal-btn"
            onClick={closeUpdateStatusModal} 
            className="text-emerald-200 hover:text-white p-1 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <p className="font-bold text-slate-800">{statusModalComplaint.id}: {statusModalComplaint.title}</p>
            <p className="text-slate-500 mt-1">
              Current Status: <span className="font-semibold text-emerald-700">{statusModalComplaint.status}</span>
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              New Status
            </label>
            <select
              id="update-status-select"
              value={newStatus}
              onChange={e => setNewStatus(e.target.value as ComplaintStatus)}
              className="w-full text-sm p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            >
              {statuses.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Official Remarks / Redressal Notes
            </label>
            <textarea
              id="update-status-notes"
              rows={3}
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              placeholder="State the progress update or reasons for status change..."
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              id="cancel-status-btn"
              onClick={closeUpdateStatusModal}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              id="confirm-status-btn"
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
