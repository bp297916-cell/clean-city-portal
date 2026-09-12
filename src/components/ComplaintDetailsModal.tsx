import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Calendar, 
  User, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Compass, 
  MessageSquare, 
  Eye, 
  Share2, 
  Printer,
  Building,
  AlertCircle
} from 'lucide-react';
import { ComplaintStatus, ComplaintPriority } from '../types';

export const ComplaintDetailsModal: React.FC = () => {
  const { selectedComplaint, closeComplaintDetails } = useApp();

  if (!selectedComplaint) return null;

  const getStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'Submitted':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Under Verification':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Assigned':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'In Progress':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getPriorityBadge = (priority: ComplaintPriority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const allStages: ComplaintStatus[] = [
    'Submitted',
    'Under Verification',
    'Assigned',
    'In Progress',
    'Resolved'
  ];

  const currentStageIndex = allStages.indexOf(selectedComplaint.status);

  return (
    <div 
      id="complaint-details-modal-overlay" 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={closeComplaintDetails}
    >
      <div 
        id="complaint-details-modal"
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2.5 py-1 bg-emerald-600 rounded-md font-bold tracking-wider text-white">
              {selectedComplaint.id}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getStatusBadge(selectedComplaint.status)}`}>
              {selectedComplaint.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              id="close-complaint-details-btn"
              onClick={closeComplaintDetails}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Title & Category Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-md border border-emerald-200">
                {selectedComplaint.category}
              </span>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-md border ${getPriorityBadge(selectedComplaint.priority)}`}>
                Priority: {selectedComplaint.priority}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1 ml-auto">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Submitted: {selectedComplaint.createdAt}</span>
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              {selectedComplaint.title}
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              {selectedComplaint.description}
            </p>
          </div>

          {/* Location & Citizen Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Location / Ward</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">{selectedComplaint.location}</p>
              <p className="text-xs text-slate-500">{selectedComplaint.ward}</p>
              {selectedComplaint.coordinates && (
                <p className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                  GPS: {selectedComplaint.coordinates.lat.toFixed(4)}°N, {selectedComplaint.coordinates.lng.toFixed(4)}°E
                </p>
              )}
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                <User className="w-4 h-4 text-emerald-600" />
                <span>Reporting Citizen</span>
              </div>
              <p className="text-sm font-semibold text-slate-800">{selectedComplaint.citizenName}</p>
              <p className="text-xs text-slate-500">{selectedComplaint.citizenPhone} • {selectedComplaint.citizenEmail}</p>
            </div>
          </div>

          {/* Assigned Officer & Remarks */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <Building className="w-4 h-4 text-emerald-700" />
                <span>Assigned Municipal Authority</span>
              </div>
              <span className="text-xs font-semibold text-emerald-800">
                {selectedComplaint.assignedOfficer ? 'Officer Deployed' : 'Awaiting Assignment'}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {selectedComplaint.assignedOfficer || 'Municipal Grievance Cell (Ward Operations)'}
            </p>
            {selectedComplaint.officerRemarks && (
              <div className="mt-2 text-xs text-slate-700 bg-white p-3 rounded-lg border border-emerald-200 leading-relaxed">
                <span className="font-bold text-emerald-900 block mb-1">Official Remarks / Action Log:</span>
                {selectedComplaint.officerRemarks}
              </div>
            )}
          </div>

          {/* Visual Progress Timeline */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Redressal Progress Timeline</span>
            </h3>

            {/* Stepper bar */}
            <div className="grid grid-cols-5 gap-1 mb-6 text-center">
              {allStages.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;
                return (
                  <div key={stage} className="flex flex-col items-center">
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isCurrent
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                          : isPassed
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span className={`text-[10px] sm:text-xs mt-1.5 font-medium leading-tight ${isCurrent ? 'text-emerald-800 font-bold' : isPassed ? 'text-slate-800' : 'text-slate-400'}`}>
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Detailed Timeline Events */}
            <div className="relative pl-6 space-y-4 border-l-2 border-emerald-200 ml-3">
              {selectedComplaint.timeline.map((event, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-emerald-600 border-2 border-white"></div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-emerald-900">{event.status}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{event.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-700">{event.note}</p>
                    <p className="text-[10px] text-slate-400 mt-1">Logged by: {event.actor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Evidence Section */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-600" />
              <span>Photographic Evidence</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
                <img 
                  src={selectedComplaint.photoUrl} 
                  alt="Primary Evidence" 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-2 bg-white text-[11px] font-semibold text-slate-600 text-center border-t border-slate-200">
                  Primary Photo Evidence (Geo-tagged)
                </div>
              </div>

              {selectedComplaint.additionalPhotoUrl ? (
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
                  <img 
                    src={selectedComplaint.additionalPhotoUrl} 
                    alt="Secondary Evidence" 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-2 bg-white text-[11px] font-semibold text-slate-600 text-center border-t border-slate-200">
                    Additional Photo Angle
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center text-slate-400">
                  <Eye className="w-8 h-8 mb-2 opacity-40" />
                  <p className="text-xs font-medium">No secondary photo attached</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Official Municipal Grievance Record • Clean City Portal
          </p>
          <button
            onClick={closeComplaintDetails}
            className="px-5 py-2 text-sm font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};
