import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Complaint, ComplaintStatus, ComplaintPriority } from '../types';
import { Search, Compass, CheckCircle2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export const PublicTrackPage: React.FC = () => {
  const { complaints, openComplaintDetails, trackSearchId, setTrackSearchId, language } = useApp();
  const t = (key: any) => getTranslation(language, key);

  const [inputVal, setInputVal] = useState(trackSearchId || 'CC-90812');
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(() => {
    return complaints.find(c => c.id.toUpperCase() === (trackSearchId || 'CC-90812').toUpperCase()) || complaints[0] || null;
  });
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (trackSearchId) {
      setInputVal(trackSearchId);
      const found = complaints.find(c => c.id.toUpperCase() === trackSearchId.toUpperCase());
      if (found) {
        setActiveComplaint(found);
      }
    }
  }, [trackSearchId, complaints]);

  const handleSearch = (e?: React.FormEvent, customId?: string) => {
    if (e) e.preventDefault();
    const query = (customId || inputVal).trim().toUpperCase();
    if (!query) return;

    const found = complaints.find(c => c.id.toUpperCase() === query);
    if (found) {
      setActiveComplaint(found);
      setTrackSearchId(found.id);
      setErrorMsg('');
    } else {
      setErrorMsg(`No complaint found with ID "${query}". Please check the number.`);
    }
  };

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

  const stages: ComplaintStatus[] = [
    'Submitted',
    'Under Verification',
    'Assigned',
    'In Progress',
    'Resolved'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
          Public Grievance Tracker
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 font-display">
          Track Municipal Complaint Status
        </h1>
        <p className="text-sm text-slate-600">
          Enter your unique Grievance Reference ID (e.g. CC-90812) to check the real-time resolution timeline and field officer remarks.
        </p>
      </div>

      {/* Search Box */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <form onSubmit={e => handleSearch(e)} className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Enter Complaint ID (e.g. CC-90812)"
              className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 font-mono uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            Track Status
          </button>
        </form>

        {errorMsg && <p className="text-xs text-red-600 font-medium">{errorMsg}</p>}

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 pt-1">
          <span>Sample IDs to try:</span>
          {complaints.slice(0, 4).map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setInputVal(c.id);
                handleSearch(undefined, c.id);
              }}
              className="font-mono text-emerald-700 hover:underline font-semibold"
            >
              {c.id}
            </button>
          ))}
        </div>
      </div>

      {/* Results Card */}
      {activeComplaint && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold px-2.5 py-0.5 rounded bg-slate-900 text-white">
                  {activeComplaint.id}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {activeComplaint.category}
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-2">{activeComplaint.title}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{activeComplaint.location} • {activeComplaint.ward}</p>
            </div>

            <div className="text-right">
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(activeComplaint.status)}`}>
                {activeComplaint.status}
              </span>
              <p className="text-[11px] text-slate-400 mt-1">Logged: {activeComplaint.createdAt}</p>
            </div>
          </div>

          {/* 5-Stage Timeline */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-5">
              Live Municipal Resolution Progress
            </h3>

            {(() => {
              const currentIdx = stages.indexOf(activeComplaint.status);

              return (
                <div className="relative">
                  <div className="hidden sm:block absolute top-4 left-6 right-6 h-1 bg-slate-200 -z-0">
                    <div 
                      className="h-full bg-emerald-600 transition-all duration-500"
                      style={{ width: `${(currentIdx / (stages.length - 1)) * 100}%` }}
                    ></div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10 text-center">
                    {stages.map((stg, idx) => {
                      const isDone = idx <= currentIdx;
                      const isCurrent = idx === currentIdx;

                      return (
                        <div key={stg} className="flex flex-col items-center bg-white p-2 rounded-xl sm:bg-transparent">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isCurrent
                                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md'
                                : isDone
                                ? 'bg-emerald-700 text-white'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span className={`text-[11px] mt-2 font-semibold leading-tight ${
                            isCurrent ? 'text-emerald-900 font-bold' : isDone ? 'text-slate-800' : 'text-slate-400'
                          }`}>
                            {stg}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Details & Officer remarks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Assigned Officer</span>
              <p className="font-bold text-slate-800 text-sm">
                {activeComplaint.assignedOfficer || 'Pending Inspection Assignment'}
              </p>
              <p className="text-slate-500">{activeComplaint.ward}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Grievance Status</span>
              <p className="font-bold text-slate-800 text-sm">{activeComplaint.status}</p>
              <p className="text-slate-500">Last updated on {activeComplaint.updatedAt}</p>
            </div>
          </div>

          {activeComplaint.officerRemarks && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-900 uppercase tracking-wider text-[10px]">Officer Remarks</span>
              <p className="text-slate-700">{activeComplaint.officerRemarks}</p>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => openComplaintDetails(activeComplaint)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              View Full Photographs & Log
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
